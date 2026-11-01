# 💳 Credit Fraud Detection Using Machine Learning

An end-to-end Credit Card Fraud Detection application built using **Machine Learning, FastAPI, React, and Docker**. The system analyzes transaction details and predicts whether a transaction is Genuine or Fraud, along with fraud probability and risk level.

## 🌐 Live Demo

- **Frontend:** https://credit-fraud-detection-frontend-eight.vercel.app/
- **Transaction Analyzer:** https://credit-fraud-detection-frontend-eight.vercel.app/analyzer
- **Backend API:** https://credit-fraud-detection-fr4k.onrender.com/
- **API Documentation:** https://credit-fraud-detection-fr4k.onrender.com/docs
- **GitHub Repository:** https://github.com/kalakanhuswain18-hub/Credit-Fraud-Detection

## 🚀 Features

- Machine Learning-based transaction classification.
- Fraud and Genuine transaction prediction.
- Fraud probability and Genuine probability.
- AI risk analysis with LOW, MEDIUM, and HIGH risk levels.
- Interactive transaction analyzer.
- Animated React user interface with a 3D assistant.
- REST API integration using FastAPI.
- Input validation using Pydantic.
- Automated API tests using Pytest.
- Docker configuration for containerization.
- Cloud deployment using Vercel and Render.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Programming | Python, JavaScript |
| Machine Learning | Scikit-learn, Random Forest, Logistic Regression |
| Data Processing | Pandas, NumPy |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Vite, CSS |
| Animation & 3D | Framer Motion, Three.js, React Three Fiber |
| Testing | Pytest |
| Deployment | Vercel, Render |
| Containerization | Docker, Docker Compose |
| Version Control | Git, GitHub |

## 🧠 Machine Learning Workflow

1. Synthetic transaction dataset generation.
2. Data cleaning and preprocessing.
3. Feature engineering and encoding.
4. Train-test splitting.
5. Handling class imbalance using class weights.
6. Training Logistic Regression and Random Forest models.
7. Model evaluation.
8. Model serialization using Joblib.
9. Integrating the trained model with FastAPI.
10. Connecting the React frontend with the prediction API.

## 📊 Transaction Input Features

The application accepts the following transaction details:

- Transaction Amount
- Transaction Hour
- Transaction Type
- Account Balance
- Transaction Channel

## 📁 Project Structure

```text
Credit_Fraud/
│
├── api/
│   ├── main.py
│   ├── requirements.txt
│   └── requirements-lock.txt
│
├── data/
│   └── raw/
│       └── transactions.csv
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── Dockerfile
│   └── nginx.conf
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
├── api/Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/kalakanhuswain18-hub/Credit-Fraud-Detection.git

cd Credit-Fraud-Detection
```

### 2. Setup Backend

```bash
python -m venv venv
```

Activate the environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r api/requirements.txt
```

Start FastAPI:

```bash
uvicorn api.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## 🐳 Run with Docker

From the project root directory:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

## 🧪 Run Tests

From the project root:

```bash
python -m pytest tests/ -v
```

## ☁️ Deployment

| Component | Platform |
|---|---|
| React Frontend | Vercel |
| FastAPI Backend | Render |
| Source Code | GitHub |

## ⚠️ Dataset Disclaimer

This project uses a **synthetic transaction dataset** generated for educational and demonstration purposes.

The dataset does not represent actual bank transactions or verified real-world fraud cases. Model predictions and risk scores are experimental and must not be used for real financial decisions.

This application is a learning project and is not intended for production banking or financial security systems.

## 🎯 Project Objective

The objective of this project is to demonstrate how machine learning models can be integrated into a full-stack web application, exposed through REST APIs, containerized with Docker, and deployed to cloud platforms.

## 👨‍💻 Author

**Kalakanhu Swain**

Computer Science & Engineering Student

GitHub: https://github.com/kalakanhuswain18-hub

---

⭐ If you find this project interesting, consider giving the repository a star!
