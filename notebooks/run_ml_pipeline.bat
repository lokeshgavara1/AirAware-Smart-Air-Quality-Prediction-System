@echo off
echo Running AirAware ML Pipeline...
echo =============================

echo Activating virtual environment...
cd ..
cd backend
call venv\Scripts\activate.bat
cd ..
cd notebooks

echo Running ML pipeline...
python milestone2_ml.py

echo ML pipeline completed!
pause