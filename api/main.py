
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pathlib import Path
from typing import Literal

import joblib
import pandas as pd


# Project root directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Model path
MODEL_PATH = BASE_DIR / "models" / "random_forest_model.pkl"

# Load trained model
model = joblib.load(MODEL_PATH)

print("Random Forest Model Loaded Successfully!")


# FastAPI application
app = FastAPI(
    title="Credit Fraud Detection API",
    version="1.1.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Input validation
class TransactionInput(BaseModel):

    transaction_amount: float = Field(gt=0)

    transaction_hour: int = Field(ge=0, le=23)

    transaction_type: Literal[
        "UPI",
        "NEFT",
        "IMPS",
        "RTGS",
        "ATM",
        "POS",
        "Credit_Card"
    ]

    account_balance: float = Field(ge=0)

    channel: Literal[
        "Mobile_App",
        "Web",
        "ATM",
        "POS_Terminal",
        "Branch"
    ]


# Prediction response
class PredictionResponse(BaseModel):

    prediction: Literal["GENUINE", "FRAUD"]

    fraud_probability: float

    genuine_probability: float

    risk_level: str

    status: str


# Home endpoint
@app.get("/")
def home():

    return {
        "message": "Credit Fraud Detection API is running!"
    }


# Transaction endpoint
@app.post("/transaction")
def receive_transaction(data: TransactionInput):

    return {
        "message": "Transaction received successfully!",
        "transaction": data.model_dump()
    }


# Fraud prediction endpoint
@app.post("/predict", response_model=PredictionResponse)
def predict_fraud(data: TransactionInput):

    # Convert input into DataFrame
    transaction_df = pd.DataFrame(
        [data.model_dump()]
    )

    # Get model prediction
    raw_prediction = model.predict(transaction_df)[0]

    # Get model classes
    classes = list(model.classes_)

    # Find probability indexes using class labels
    fraud_index = classes.index(1)
    genuine_index = classes.index(0)

    # Get predicted probabilities
    probabilities = model.predict_proba(transaction_df)[0]

    fraud_raw = float(probabilities[fraud_index])
    genuine_raw = float(probabilities[genuine_index])

    # Normalize probabilities
    total = fraud_raw + genuine_raw

    if total <= 0:
        raise ValueError("Invalid model probabilities")

    fraud_probability = (fraud_raw / total) * 100
    genuine_probability = (genuine_raw / total) * 100

    # Convert prediction into readable label
    prediction = "FRAUD" if int(raw_prediction) == 1 else "GENUINE"

    # Determine risk level
    if fraud_probability < 30:
        risk_level = "LOW"

    elif fraud_probability <= 60:
        risk_level = "MEDIUM"

    else:
        risk_level = "HIGH"

    # Return response
    return {
        "prediction": prediction,
        "fraud_probability": round(fraud_probability, 2),
        "genuine_probability": round(genuine_probability, 2),
        "risk_level": risk_level,
        "status": "success"
    }
