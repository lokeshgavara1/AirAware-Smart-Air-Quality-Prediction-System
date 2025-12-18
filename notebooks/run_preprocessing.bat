@echo off
echo Running Data Preprocessing...
echo ======================

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

pip show jupyter >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing jupyter...
    pip install jupyter
)

REM Run the data preprocessing notebook
echo Starting Jupyter notebook for data preprocessing...
jupyter notebook data_preprocessing.ipynb

pause