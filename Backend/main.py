
import os
import joblib
import pandas as pd

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal


# ============================================================
# 1. LOAD ML MODEL
# ============================================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "model",
    "mental_health_pipeline.pkl"
)

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Mental Health ML model loaded successfully.")

except Exception as e:
    model = None
    print(f"❌ Error loading ML model: {e}")


# ============================================================
# 2. TOP COUNTRIES
# ============================================================

top_countries = [
    "Other",
    "India",
    "USA",
    "Canada",
    "Australia",
    "UK",
    "Germany",
    "Mexico",
    "Turkey",
    "France"
]


# ============================================================
# 3. CREATE FASTAPI APP
# ============================================================

app = FastAPI(
    title="Mental Health Prediction API",
    description="API for predicting student mental health score",
    version="1.0.0"
)


# ============================================================
# 4. CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# 5. INPUT MODEL
# ============================================================

class StudentData(BaseModel):

    age: int = Field(..., ge=10, le=100)

    gender: Literal[
        "Male",
        "Female"
    ]

    country: str

    academic_level: Literal[
        "Undergraduate",
        "Graduate",
        "High School"
    ]

    most_used_platform: Literal[
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Snapchat",
        "Twitter",
        "YouTube",
        "TikTok",
        "LINE",
        "KakaoTalk",
        "VKontakte",
        "WhatsApp",
        "WeChat"
    ]

    purpose_of_use: Literal[
        "Networking",
        "Education",
        "Entertainment",
        "News"
    ]

    avg_daily_usage_hours: float = Field(
        ...,
        ge=0,
        le=24
    )

    daily_unlocks: int = Field(
        ...,
        ge=0
    )

    study_hours: float = Field(
        ...,
        ge=0,
        le=24
    )

    physical_activity_hours: float = Field(
        ...,
        ge=0,
        le=24
    )

    sleep_hours_per_night: float = Field(
        ...,
        ge=0,
        le=24
    )

    stress_level: Literal[
        "Medium",
        "Low",
        "Very High",
        "High"
    ]


# ============================================================
# 6. OUTPUT MODEL
# ============================================================

class PredictionResponse(BaseModel):

    predicted_mental_health_score: float


# ============================================================
# 7. HOME ROUTE
# ============================================================

@app.get("/")
def greet():

    return {
        "message": "Mental Health Prediction API is running",
        "status": "success"
    }


# ============================================================
# 8. HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "model_loaded": model is not None
    }


# ============================================================
# 9. PREDICTION ROUTE
# ============================================================

@app.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(data: StudentData):

    # Check if model loaded
    if model is None:

        raise HTTPException(
            status_code=500,
            detail="ML model could not be loaded."
        )

    try:

        # ----------------------------------------------------
        # GROUP COUNTRY
        # ----------------------------------------------------

        country_group = (
            data.country
            if data.country in top_countries
            else "Other"
        )


        # ----------------------------------------------------
        # CREATE INPUT DATAFRAME
        # ----------------------------------------------------

        input_row = pd.DataFrame([{

            "Age": data.age,

            "Gender": data.gender,

           # "Country": data.country,

            "Academic_Level": data.academic_level,

            "Most_Used_Platform": data.most_used_platform,

            "Purpose_Of_Use": data.purpose_of_use,

            "Avg_Daily_Usage_Hours": data.avg_daily_usage_hours,

            "Daily_Unlocks": data.daily_unlocks,

            "Study_Hours": data.study_hours,

            "Physical_Activity_Hours": data.physical_activity_hours,

            "Sleep_Hours_Per_Night": data.sleep_hours_per_night,

            "Stress_Level": data.stress_level,

            "group_Country": data.country

        }])


        # ----------------------------------------------------
        # PREDICT
        # ----------------------------------------------------

        prediction = model.predict(input_row)[0]


        # ----------------------------------------------------
        # RETURN RESULT
        # ----------------------------------------------------

        return PredictionResponse(
            predicted_mental_health_score=round(
                float(prediction),
                2
            )
        )


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


# ============================================================
# 10. RUN SERVER
# ============================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )
