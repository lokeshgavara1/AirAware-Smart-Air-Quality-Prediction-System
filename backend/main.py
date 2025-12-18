from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import air_quality, prediction, chatbot
from config.database import connect_to_mongo, close_mongo_connection

app = FastAPI(
    title="AirAware API",
    description="Smart Air Quality Prediction System",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3012"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include routers
app.include_router(air_quality.router, prefix="/api/v1")
app.include_router(prediction.router, prefix="/api/v1")
app.include_router(chatbot.router, prefix="/api/v1/chatbot")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

@app.get("/")
async def root():
    return {"message": "Welcome to AirAware API"}

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "AirAware backend running"}