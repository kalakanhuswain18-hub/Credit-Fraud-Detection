
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_home_endpoint():
    response = client.get("/")

    assert response.status_code == 200
    assert "message" in response.json()


def test_predict_endpoint():
    transaction = {
        "transaction_amount": 25000,
        "transaction_hour": 14,
        "transaction_type": "UPI",
        "account_balance": 75000,
        "channel": "Mobile_App"
    }

    response = client.post("/predict", json=transaction)

    assert response.status_code == 200
    assert response.json()["prediction"] in ["FRAUD", "GENUINE"]
    assert 0 <= response.json()["fraud_probability"] <= 100

def test_invalid_transaction_hour():
    transaction = {
        "transaction_amount": 25000,
        "transaction_hour": 30,
        "transaction_type": "UPI",
        "account_balance": 75000,
        "channel": "Mobile_App"
    }

    response = client.post("/predict", json=transaction)

    assert response.status_code == 422
def test_invalid_transaction_type():
    transaction = {
        "transaction_amount": 25000,
        "transaction_hour": 14,
        "transaction_type": "BITCOIN",
        "account_balance": 75000,
        "channel": "Mobile_App"
    }

    response = client.post("/predict", json=transaction)

    assert response.status_code == 422
def test_invalid_channel():
    transaction = {
        "transaction_amount": 25000,
        "transaction_hour": 14,
        "transaction_type": "UPI",
        "account_balance": 75000,
        "channel": "Unknown_Channel"
    }

    response = client.post("/predict", json=transaction)

    assert response.status_code == 422    