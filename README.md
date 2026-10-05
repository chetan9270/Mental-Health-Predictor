# 🧠 Mental Health Prediction

> An end-to-end Machine Learning web application that predicts a mental health score based on lifestyle, academic, and social media behavior.

<p align="center">
  <strong>React + Vite</strong> •
  <strong>FastAPI</strong> •
  <strong>Scikit-learn</strong> •
  <strong>REST API</strong> •
  <strong>Render</strong>
</p>

---

## 🌐 Live Demo

### 🚀 Frontend

👉 https://mental-health-predictor-frontend5.onrender.com



## 📌 Overview

**Mental Health Prediction** is a full-stack Machine Learning application that connects a trained ML model with a modern web interface.

Users provide information about their:

* 👤 Age and gender
* 🌍 Country
* 🎓 Academic level
* 📱 Most-used social media platform
* 🎯 Purpose of social media usage
* ⏱️ Daily social media usage
* 🔓 Daily phone unlocks
* 📚 Study hours
* 🏃 Physical activity
* 😴 Sleep duration
* 😓 Stress level

The frontend sends this information to a **FastAPI REST API**, which processes the input and uses the trained Machine Learning model to generate a prediction.

This project demonstrates a complete ML application workflow:


User
  │
  ▼
React + Vite Frontend
  │
  │ JSON Request
  ▼
FastAPI REST API
  │
  ▼
Data Processing
  │
  ▼
Trained ML Model
  │
  ▼
Prediction
  │
  ▼
React UI

---

## ✨ Features

* 🎨 Modern and responsive React interface
* 🤖 Machine Learning-based prediction
* ⚡ FastAPI REST backend
* 🔐 Pydantic request validation
* 🔄 Frontend-to-backend API integration
* 🌐 CORS configuration
* 📊 Structured prediction workflow
* 🚀 Deployed frontend and backend
* 📖 Interactive Swagger API documentation
* ♻️ Resettable prediction form
* ⏳ Loading state while prediction is generated
* ❌ User-friendly API error handling

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| React      | User interface                  |
| Vite       | Frontend development/build tool |
| JavaScript | Application logic               |
| CSS        | UI styling and animations       |

### Backend

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| Python       | Backend and ML environment |
| FastAPI      | REST API framework         |
| Pydantic     | Request validation         |
| Pandas       | Data processing            |
| NumPy        | Numerical operations       |
| Scikit-learn | Machine Learning           |
| Joblib       | Model serialization        |

### Deployment

| Platform | Usage                           |
| -------- | ------------------------------- |
| Render   | Frontend and backend deployment |
| GitHub   | Source code and version control |

---

## 📂 Project Structure


Mental-Health_Prediction/
│
├── Backend/
│   ├── main.py
│   ├── requirement.txt
│   └── model/
│       └── <trained-model-file>
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── README.md
└── .gitignore


# 🔌 Backend API

## Production URL

```text
https://mental-health-predictor-4-3xgz.onrender.com
```

## Swagger Documentation


https://mental-health-predictor-4-3xgz.onrender.com/docs


## Prediction Endpoint


POST /predict


Full endpoint:


https://mental-health-predictor-4-3xgz.onrender.com/predict




## 📥 Request Body

The `/predict` endpoint accepts JSON data in the following format:


{
  "age": 22,
  "gender": "Male",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Education",
  "avg_daily_usage_hours": 5.5,
  "daily_unlocks": 35,
  "study_hours": 4,
  "physical_activity_hours": 1.5,
  "sleep_hours_per_night": 7,
  "stress_level": "Medium"
}


---

## 📤 Example API Response

{
  "prediction": 72.5
}


The exact response depends on the trained Machine Learning model and the input values.

---

# 🧪 API Testing

The API can be tested using:

* Swagger UI
* Postman
* cURL
* React frontend

### Example cURL Request

curl -X POST "https://mental-health-predictor-4-3xgz.onrender.com/predict" \
-H "Content-Type: application/json" \
-d '{
  "age": 22,
  "gender": "Male",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Education",
  "avg_daily_usage_hours": 5.5,
  "daily_unlocks": 35,
  "study_hours": 4,
  "physical_activity_hours": 1.5,
  "sleep_hours_per_night": 7,
  "stress_level": "Medium"
}'


---

# 💻 Local Development

## 1️⃣ Clone the Repository


git clone YOUR_GITHUB_REPOSITORY_URL
cd Mental-Health_Prediction


---

## 2️⃣ Backend Setup

Navigate to the backend directory:


cd Backend

Create a virtual environment:


python -m venv .venv


Activate the environment on Windows PowerShell:


.\.venv\Scripts\Activate.ps1


Install dependencies:

```bash
pip install -r requirement.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 3️⃣ Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL similar to:

```text
http://localhost:5173
```

---

# 🔗 Frontend–Backend Integration

The React frontend communicates with the FastAPI backend through the `/predict` endpoint.

The deployed frontend uses:

```javascript
const API_URL =
  "https://mental-health-predictor-4-3xgz.onrender.com/predict";
```

For local development, this can be changed to:

```javascript
const API_URL =
  "http://127.0.0.1:8000/predict";
```

---

# 🚀 Deployment

The application is deployed using **Render**.

### Frontend

The React/Vite frontend is deployed as a web service.

Typical build configuration:

```text
Build Command:
npm install && npm run build
```

The frontend serves the generated Vite application.

### Backend

The FastAPI backend is deployed separately.

Typical build command:

```text
pip install -r requirement.txt
```

Start command:

```text
uvicorn main:app --host 0.0.0.0 --port $PORT
```

The backend is available at:

```text
https://mental-health-predictor-4-3xgz.onrender.com
```

---

# 🧠 Machine Learning Workflow

The project follows a typical Machine Learning workflow:

```text
Dataset
   │
   ▼
Data Cleaning
   │
   ▼
Data Preprocessing
   │
   ▼
Feature Engineering
   │
   ▼
Model Training
   │
   ▼
Model Evaluation
   │
   ▼
Model Serialization
   │
   ▼
FastAPI Integration
   │
   ▼
React Frontend
   │
   ▼
Prediction
```

The trained model is saved and loaded by the FastAPI backend using **Joblib**.

---

# 📊 Input Features

| Feature            | Description                        |
| ------------------ | ---------------------------------- |
| Age                | User's age                         |
| Gender             | User's gender                      |
| Country            | User's country                     |
| Academic Level     | Current education level            |
| Most Used Platform | Primary social media platform      |
| Purpose of Use     | Main reason for using social media |
| Daily Usage        | Average daily social media usage   |
| Daily Unlocks      | Approximate phone unlock count     |
| Study Hours        | Daily study duration               |
| Physical Activity  | Daily physical activity duration   |
| Sleep Hours        | Average sleep duration             |
| Stress Level       | Reported stress level              |

---

# 🎯 Project Objective

The objective of this project is to demonstrate how a Machine Learning model can be transformed into a usable full-stack application.

Instead of interacting directly with a notebook, users can enter information through a web interface and receive a prediction through a deployed REST API.

This project combines:

**Machine Learning + Backend Development + API Development + Frontend Development + Deployment**

---

# 🔒 Important Notes

* This project is intended for **educational and demonstration purposes**.
* The prediction should **not be considered a medical diagnosis**.
* The model's output depends on the quality and limitations of the training dataset.
* `.env` files, API keys, credentials, virtual environments, and `node_modules` should not be committed to GitHub.

---

# 👨‍💻 Author

**Chetan Bachhav**

B.Tech — Artificial Intelligence & Machine Learning

Interested in:

* 🤖 Artificial Intelligence
* 🧠 Machine Learning
* 🔐 AI & Cybersecurity
* ⚙️ Generative AI
* 🔗 Agentic AI
* 🌐 Full-Stack AI Applications

---

# 📜 License

This project is created for educational and demonstration purposes.
