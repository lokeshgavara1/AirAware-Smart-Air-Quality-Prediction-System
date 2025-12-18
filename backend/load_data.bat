@echo off
echo Loading Air Quality Data to MongoDB...
echo ================================
cd /d "%~dp0"
call venv\Scripts\activate.bat
python load_data_to_mongodb.py
pause