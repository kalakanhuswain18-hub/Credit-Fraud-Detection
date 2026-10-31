
import pandas as pd
import numpy as np
from pathlib import Path

# ==========================================
# 1. CONFIGURATION
# ==========================================

NUM_TRANSACTIONS = 5000
RANDOM_STATE = 42

rng = np.random.default_rng(RANDOM_STATE)

# ==========================================
# 2. TRANSACTION CATEGORIES
# ==========================================

transaction_types = [
    "UPI", "NEFT", "IMPS", "RTGS",
    "ATM", "POS", "Credit_Card"
]

channels = [
    "Mobile_App", "Web", "ATM",
    "POS_Terminal", "Branch"
]

merchant_categories = [
    "Shopping", "Food", "Travel",
    "Healthcare", "Electronics",
    "Education", "Entertainment", "Utilities"
]

account_types = ["Savings", "Current"]

# ==========================================
# 3. GENERATE TRANSACTION FEATURES
# ==========================================

# Generate transaction amounts with more variation

transaction_amount = rng.lognormal(
    mean=8,
    sigma=1.8,
    size=NUM_TRANSACTIONS
)

transaction_amount = np.clip(
    transaction_amount,
    100,
    1000000
).round(2)

transaction_hour = rng.integers(0, 24, NUM_TRANSACTIONS)

transaction_type = rng.choice(
    transaction_types, NUM_TRANSACTIONS
)

channel = rng.choice(channels, NUM_TRANSACTIONS)

merchant_category = rng.choice(
    merchant_categories, NUM_TRANSACTIONS
)

account_type = rng.choice(
    account_types, NUM_TRANSACTIONS
)

account_balance = np.clip(
    rng.lognormal(mean=10.5, sigma=1.1, size=NUM_TRANSACTIONS),
    500,
    5000000
).round(2)


# ==========================================
# 4. FRAUD LABEL GENERATION
# ==========================================

# Internal risk indicators
# These are used only to generate labels.
# They will NOT be saved as CSV columns.

night_transaction = np.isin(
    transaction_hour,
    [22, 23, 0, 1, 2, 3, 4, 5]
)

high_amount = transaction_amount > 200000

very_high_amount = transaction_amount > 500000

risky_transaction_type = np.isin(
    transaction_type,
    ["RTGS", "ATM"]
)

risky_channel = np.isin(
    channel,
    ["Web", "Mobile_App"]
)

# Create internal risk score
risk_score = (
    1.0
    + 8.0 * (night_transaction & high_amount)
    + 3.0 * very_high_amount
    + 1.5 * risky_transaction_type
    + 0.5 * risky_channel
)

# Exactly 5% fraud transactions
NUM_FRAUD = int(NUM_TRANSACTIONS * 0.05)

# Convert risk scores into sampling probabilities
sampling_probabilities = (
    risk_score / risk_score.sum()
)

# Randomly select fraud transaction indices
fraud_indices = rng.choice(
    NUM_TRANSACTIONS,
    size=NUM_FRAUD,
    replace=False,
    p=sampling_probabilities
)

# Create target labels
is_fraud = np.zeros(
    NUM_TRANSACTIONS,
    dtype=int
)

is_fraud[fraud_indices] = 1

print("Fraud labels generated:", is_fraud.sum())

# ==========================================
# 5. CREATE DATAFRAME
# ==========================================

df = pd.DataFrame({
    "transaction_amount": transaction_amount,
    "transaction_hour": transaction_hour,
    "transaction_type": transaction_type,
    "account_balance": account_balance,
    "channel": channel,
    "merchant_category": merchant_category,
    "account_type": account_type,
    "is_fraud": is_fraud
})

# ==========================================
# 6. SAVE CSV FILE
# ==========================================

PROJECT_ROOT = Path(__file__).resolve().parent.parent

OUTPUT_PATH = (
    PROJECT_ROOT / "data" / "raw" / "transactions.csv"
)

OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

df.to_csv(OUTPUT_PATH, index=False)

# ==========================================
# 7. DISPLAY RESULTS
# ==========================================

print("\nDataset generated successfully!")

print("\nDataset shape:", df.shape)

print("\nFirst 5 transactions:")
print(df.head())

print("\nFraud distribution:")
print(df["is_fraud"].value_counts())

print("\nFraud percentage:")
print(df["is_fraud"].value_counts(normalize=True) * 100)

print("\nCSV saved at:")
print(OUTPUT_PATH)
