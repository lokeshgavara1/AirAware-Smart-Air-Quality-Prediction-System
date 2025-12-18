@echo off
echo Running Data Preprocessing Script...
echo =============================

REM Activate virtual environment if it exists
if exist ..\backend\venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call ..\backend\venv\Scripts\activate.bat
)

REM Install required packages if not installed
pip show scikit-learn >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing scikit-learn...
    pip install scikit-learn
)

pip show pandas >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing pandas...
    pip install pandas
)

pip show numpy >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing numpy...
    pip install numpy
)

REM Run the data preprocessing script
echo Running data preprocessing script...
python run_preprocessing.py

pause