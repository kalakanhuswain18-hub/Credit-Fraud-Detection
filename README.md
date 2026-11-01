# Credit Fraud Detection Using Machine Learning

An end-to-end Machine Learning application for identifying potentially fraudulent financial transactions using **Logistic Regression** and **Random Forest**.

The project combines a Machine Learning pipeline, FastAPI backend, React frontend, and Docker-based deployment.

> **Project Status: Dockerized full-stack application**

## Project Overview

Credit Fraud Detection demonstrates how supervised Machine Learning can analyze transaction characteristics and estimate potential fraud risk.

### Key Features

- Synthetic financial transaction dataset generation
- Exploratory Data Analysis (EDA)
- Data preprocessing and feature engineering
- Logistic Regression and Random Forest models
- Fraud probability estimation
- FastAPI REST API
- Interactive React dashboard
- Real-time frontend-backend integration
- Transaction risk visualization
- Automated API tests using Pytest
- Docker and Docker Compose deployment

## Tech Stack

| Category | Technologies |
|---|---|
| Programming | Python, JavaScript |
| Data Analysis | Pandas, NumPy |
| Visualization | Matplotlib |
| Machine Learning | Scikit-learn |
| ML Algorithms | Logistic Regression, Random Forest |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Vite |
| UI Animation | Framer Motion |
| 3D Graphics | Three.js, React Three Fiber |
| Testing | Pytest, FastAPI TestClient |
| Containerization | Docker, Docker Compose |
| Version Control | Git, GitHub |

## Project Architecture

```text
React Frontend
      |
      | HTTP Request
      v
FastAPI Backend
      |
      v
Data Validation
      |
      v
Preprocessing Pipeline
      |
      v
Random Forest Model
      |
      v
Fraud Probability
      |
      v
Risk Classification
      |
      v
React Dashboard
```

## Project Structure

```text
Credit_Fraud/
|
├── api/
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
│   ├── requirements-lock.txt
│   └── requirements-docker.txt
│
├── data/
│   └── raw/
│       └── transactions.csv
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RobotAssistant.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Analyzer.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
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
├── tests/
│   └── test_api.py
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Dataset Information

The project uses 5,000 synthetically generated financial transactions.

| Class | Transactions | Percentage |
|---|---:|---:|
| Genuine | 4,750 | 95% |
| Fraud | 250 | 5% |
| Total | 5,000 | 100% |

### Dataset Features

- `transaction_amount`
- `transaction_hour`
- `transaction_type`
- `account_balance`
- `channel`
- `merchant_category`
- `account_type`
- `is_fraud`

The prediction API currently uses five input features:

1. Transaction amount
2. Transaction hour
3. Transaction type
4. Account balance
5. Transaction channel

**Dataset Disclaimer:** The dataset and fraud labels are synthetically generated using risk-weighted sampling. They do not represent verified real-world banking transactions.

## Machine Learning Workflow

1. Synthetic dataset generation
2. Exploratory Data Analysis
3. Feature selection
4. Train-test split
5. Missing-value handling
6. Numerical feature scaling
7. Categorical feature encoding
8. Model training
9. Model evaluation
10. Model serialization using Joblib

### Models

**Logistic Regression**

Used as a baseline classification algorithm.

**Random Forest Classifier**

An ensemble learning algorithm that combines multiple decision trees.

Both models use class-weight balancing to address class imbalance.

### Initial Model Evaluation

| Metric | Logistic Regression | Random Forest |
|---|---:|---:|
| Accuracy | 67.30% | 79.40% |
| Fraud Precision | 7% | 10% |
| Fraud Recall | 48% | 38% |
| Fraud F1-Score | 0.13 | 0.16 |
| PR-AUC | 0.0966 |