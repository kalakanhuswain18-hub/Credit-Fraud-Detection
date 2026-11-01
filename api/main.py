
from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
from pathlib import Path
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware

# Project root directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Model path
MODEL_PATH = BASE_DIR / "models" / "random_forest_model.pkl"

# Load trained model
model = joblib.load(MODEL_PATH)

print("Random Forest Model Loaded Successfully!")
app = FastAPI(
    title="Credit Fraud Detection API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransactionInput(BaseModel):
    transaction_amount: float = Field(gt=0)
    transaction_hour: int = Field(ge=0, le=23)

    transaction_type: Literal[
        "UPI", "NEFT", "IMPS", "RTGS",
        "ATM", "POS", "Credit_Card"
    ]

    account_balance: float = Field(ge=0)

    channel: Literal[
        "Mobile_App", "Web", "ATM",
        "POS_Terminal", "Branch"
    ]
class PredictionResponse(BaseModel):
    prediction: str
    fraud_probability: float
    genuine_probability: float
    risk_level: str
    status: str    
# GET endpoint
@app.get("/")
def home():
    return {
        "message": "Credit Fraud Detection API is running!"
    }


# POST endpoint
@app.post("/transaction")
def receive_transaction(data: TransactionInput):
    return {
        "message": "Transaction received successfully!",
        "transaction": data.model_dump()
    }


@app.post("/predict", response_model=PredictionResponse)
def predict_fraud(data: TransactionInput):

    import pandas as pd

    transaction_df = pd.DataFrame([data.model_dump()])

    prediction = model.predict(transaction_df)[0]

    fraud_probability = float(
        model.predict_proba(transaction_df)[0][1]
    )

    genuine_probability = 1 - fraud_probability

    # Determine risk level
    if fraud_probability < 0.30:
        risk_level = "LOW"
    elif fraud_probability <= 0.60:
        risk_level = "MEDIUM"
    else:
        risk_level = "HIGH"

    return {
        "prediction": "FRAUD" if prediction == 1 else "GENUINE",
        "fraud_probability": round(fraud_probability * 100, 2),
        "genuine_probability": round(genuine_probability * 100, 2),
        "risk_level": risk_level,
        "status": "success"
    }
