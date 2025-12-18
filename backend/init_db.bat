@echo off
echo Initializing Database with Sample Data...
echo ================================
cd /d "%~dp0"
call venv\Scripts\activate.bat
python init_db.py
pause