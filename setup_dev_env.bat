@echo off
echo Setting up AirAware Development Environment...
echo ======================================

echo Creating backend virtual environment...
cd backend
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing backend dependencies...
pip install -r requirements.txt

echo Installing additional dependencies...
pip install jupyter pandas numpy scikit-learn

echo Initializing database...
python init_db.py

cd ..

echo Installing frontend dependencies...
cd frontend
npm install

cd ..

echo Development environment setup complete!
echo.
echo To run the application:
echo 1. Start the backend: cd backend && run_server.bat
echo 2. Start the frontend: cd frontend && run_frontend.bat
echo 3. Run data preprocessing: cd notebooks && run_preprocessing_script.bat
echo 4. Seed data to MongoDB: cd backend && seed_data.bat
echo 5. Load data to MongoDB: cd backend && load_data.bat
echo.
echo Frontend Dashboard Components:
echo - Dashboard (main page)
echo - SummaryCards (pollutant averages with visual indicators)
echo - RecentDataTable (latest readings with sorting)
echo - Placeholders for weather, predictions, heatmap, and alerts
echo.
echo Integration Features:
echo - Axios GET requests for API communication
echo - Loading states for async operations
echo - Error handling for failed requests
echo - Visual data representation with color coding
echo - Sortable data tables
echo - Responsive design for all devices
echo.
echo Chatbot Feature:
echo - AI-powered assistant for air quality information
echo - Natural language processing with OpenAI GPT-3.5
echo - Real-time responses to air quality queries
echo.

pause