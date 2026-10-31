# 💳 Credit Fraud Detection Using Machine Learning

An end-to-end Machine Learning project for detecting potentially fraudulent financial transactions using **Logistic Regression** and **Random Forest**.

This project demonstrates synthetic dataset generation, exploratory data analysis (EDA), preprocessing, model training, evaluation, and transaction-level fraud risk prediction.

> **Project Status:** Machine Learning pipeline completed. FastAPI backend, React frontend, and Docker deployment are planned.

## 🎯 Project Overview

Financial transaction fraud detection is an important application of Machine Learning. This project explores how supervised learning algorithms can identify potentially suspicious transactions based on transaction characteristics.

The system currently supports:

- Synthetic transaction dataset generation
- Exploratory Data Analysis (EDA)
- Data preprocessing and feature encoding
- Logistic Regression and Random Forest classification
- Model evaluation and comparison
- Fraud probability estimation
- Saving and loading trained models using Joblib
- Predictions on custom transaction inputs

**Important:** This project uses synthetic data with artificially generated fraud labels. It is intended for learning, experimentation, and portfolio demonstration—not real-world financial fraud detection.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Programming | Python |
| Data Analysis | Pandas, NumPy |
| Visualization | Matplotlib |
| Machine Learning | Scikit-learn |
| Algorithms | Logistic Regression, Random Forest |
| Model Serialization | Joblib |
| Development | Jupyter Notebook, VS Code |
| Version Control | Git, GitHub |

**Planned:** FastAPI, React, Docker, Docker Compose.

## 📂 Project Structure

```text
Credit-Fraud-Detection/
│
├── data/
│   └── raw/
│       └── transactions.csv
│
├── models/
│   ├── logistic_model.pkl
│   └── random_forest_model.pkl
│
├── notebook/
│   └── 01_data_exploration.ipynb
│
├── scripts/
│   └── generate_dataset.py
│
├── .gitignore
└── README.md
```

## 📊 Dataset Information

The dataset contains **5,000 synthetically generated financial transactions**.

| Class | Transactions | Percentage |
|---|---:|---:|
| Genuine (0) | 4,750 | 95% |
| Fraud (1) | 250 | 5% |
| Total | 5,000 | 100% |

### Dataset Features

| Feature | Description |
|---|---|
| `transaction_amount` | Transaction amount |
| `transaction_hour` | Transaction hour (0–23) |
| `transaction_type` | UPI, NEFT, IMPS, RTGS, ATM, POS, Credit_Card |
| `account_balance` | Account balance |
| `channel` | Transaction channel |
| `merchant_category` | Merchant category |
| `account_type` | Account type |
| `is_fraud` | Target label: 0 = Genuine, 1 = Fraud |

The current models use five input features: transaction amount, transaction hour, transaction type, account balance, and channel.

Fraud labels are generated using risk-weighted sampling based on selected transaction characteristics. These labels represent synthetic patterns rather than verified fraudulent activity.

## 🔍 Machine Learning Workflow

```text
Synthetic Data Generation
          |
          v
Exploratory Data Analysis
          |
          v
Feature Selection
          |
          v
Train/Test Split
          |
          v
Data Preprocessing
          |
          v
Model Training
          |
          v
Model Evaluation
          |
          v
Save Trained Models
          |
          v
Custom Transaction Prediction
```

### Data Preprocessing

- Numerical missing-value imputation using median
- StandardScaler for numerical features
- Categorical missing-value imputation
- OneHotEncoder for categorical features
- Stratified train/test splitting
- Class-weight balancing during model training

Scikit-learn Pipelines and ColumnTransformer are used to combine preprocessing and classification.

## 🤖 Model Training

Two supervised Machine Learning algorithms were trained:

**1. Logistic Regression**

A linear classification model used as a baseline for fraud prediction.

**2. Random Forest Classifier**

An ensemble learning algorithm that combines multiple decision trees to generate predictions.

Both models use class-weight balancing to account for the imbalanced dataset.

## 📈 Model Performance

Initial exploratory evaluation on the synthetic test dataset:

| Metric | Logistic Regression | Random Forest |
|---|---:|---:|
| Accuracy | 67.30% | 79.40% |
| Fraud Precision | 7% | 10% |
| Fraud Recall | 48% | 38% |
| Fraud F1-Score | 0.13 | 0.16 |
| PR-AUC | 0.0966 | 0.0957 |
| ROC-AUC | 0.6009 | 0.6433 |

### Key Observations

- Random Forest achieved higher accuracy and ROC-AUC.
- Logistic Regression achieved slightly higher PR-AUC and fraud recall at the default threshold.
- Fraud precision remains low for both models.
- Accuracy alone is not sufficient for evaluating imbalanced fraud detection.
- These results are exploratory and should not be interpreted as production-level performance.

## 💻 Example Prediction

The trained Random Forest model can accept a transaction with the following details:

```python
import pandas as pd
import joblib

model = joblib.load("models/random_forest_model.pkl")

transaction = pd.DataFrame([{
    "transaction_amount": 25000,
    "transaction_hour": 14,
    "transaction_type": "UPI",
    "account_balance": 75000,
    "channel": "Mobile_App"
}])

prediction = model.predict(transaction)[0]
fraud_probability = model.predict_proba(transaction)[0][1]

print("Prediction:", "FRAUD" if prediction == 1 else "GENUINE")
print(f"Fraud Probability: {fraud_probability * 100:.2f}%")
```

Example output from the trained model:

```text
Prediction: GENUINE
Fraud Probability: 46.91%
```

The probability is a model-generated estimate and is not guaranteed to represent the true likelihood of fraud.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kalakanhuswain18-hub/Credit-Fraud-Detection.git
cd Credit-Fraud-Detection
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

Activate on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install Dependencies

```bash
python -m pip install numpy pandas matplotlib scikit-learn joblib jupyter
```

For compatibility with the saved models, use the same scikit-learn version used during training. Model files created with Joblib should only be loaded from trusted sources.

### 4. Generate Synthetic Dataset

```bash
python scripts/generate_dataset.py
```

### 5. Explore the Notebook

```bash
jupyter notebook notebook/01_data_exploration.ipynb
```

The notebook contains the data exploration, preprocessing, training, and evaluation workflow.

## 🗺️ Future Roadmap

- [x] Generate synthetic financial transactions
- [x] Perform Exploratory Data Analysis
- [x] Train Logistic Regression model
- [x] Train Random Forest model
- [x] Evaluate model performance
- [x] Save trained models
- [x] Test custom transaction predictions
- [ ] Improve validation methodology and model performance
- [ ] Build FastAPI backend
- [ ] Create `/predict` REST API endpoint
- [ ] Develop React frontend
- [ ] Integrate frontend with backend
- [ ] Containerize application using Docker
- [ ] Configure Docker Compose
- [ ] Deploy application

## ⚠️ Limitations

This project is an educational prototype.

- The dataset is synthetic and does not contain real banking transactions.
- Fraud labels are artificially generated.
- Model performance is limited by the synthetic data generation process.
- Predicted probabilities have not been calibrated against real-world outcomes.
- Threshold experiments have been exploratory; a separate validation and untouched final test set are needed for rigorous evaluation.
- The system must not be used for actual financial fraud decisions.

## 👨‍💻 Author

**Kalakanhu Swain**

Computer Science & Engineering Student | AI/ML Enthusiast

GitHub: [kalakanhuswain18-hub](https://github.com/kalakanhuswain18-hub)

---

⭐ If you find this project useful, consider starring the repository.

**Built with Python, Scikit-learn, and a passion for Machine Learning.**
