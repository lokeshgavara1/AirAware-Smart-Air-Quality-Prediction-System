@echo off
echo Starting AirAware Backend Server with Chatbot...
echo =============================================

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Starting FastAPI server...
uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause