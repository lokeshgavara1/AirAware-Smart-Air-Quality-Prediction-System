# AirAware - Smart Air Quality Prediction System

![AirAware Dashboard](./docs/dashboard-preview.png)

AirAware is a comprehensive air quality monitoring and prediction system designed to collect, store, analyze, and visualize air quality data for Delhi, India. The system provides real-time monitoring capabilities and predictive analytics to help individuals and organizations make informed decisions about air quality conditions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

AirAware aims to address the critical issue of air pollution in Delhi by providing an intelligent system that:

1. Collects real-time air quality data from various sources
2. Stores and manages historical data in a scalable database
3. Provides a user-friendly dashboard for data visualization
4. Implements machine learning models for air quality prediction
5. Sends alerts and notifications for hazardous conditions
6. Offers an AI-powered chatbot for air quality inquiries

## Features

### Current Features (Milestone 1)
- ✅ Project setup with proper directory structure
- ✅ Dataset preparation and preprocessing
- ✅ MongoDB integration for data storage
- ✅ RESTful backend APIs using FastAPI
- ✅ Frontend dashboard skeleton with React and Vite

### Implemented Features
- 🔄 Real-time data processing
- 🤖 Machine learning models for air quality prediction
- 📊 Advanced data visualization and heatmaps
- 🔔 Alerting system for hazardous conditions
- 💬 AI-powered chatbot for air quality information

### Upcoming Features
- 📱 Mobile application

## Technology Stack

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast web framework for building APIs
- [Motor](https://motor.readthedocs.io/) - Asynchronous MongoDB driver
- [Pydantic](https://pydantic-docs.helpmanual.io/) - Data validation and settings management
- [OpenAI API](https://openai.com/api/) - AI-powered chatbot functionality
- [Python 3.10+](https://www.python.org/) - Programming language

### Frontend
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Axios](https://axios-http.com/) - Promise based HTTP client
- [TailwindCSS/CSS](https://tailwindcss.com/) - Utility-first CSS framework

### Database
- [MongoDB](https://www.mongodb.com/) - Document-oriented NoSQL database
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service

### Data Processing
- [Jupyter Notebook](https://jupyter.org/) - Interactive computing environment
- [Pandas](https://pandas.pydata.org/) - Data manipulation and analysis
- [NumPy](https://numpy.org/) - Scientific computing library

## Project Structure

```
/airaware
├── /backend                  # FastAPI backend application
│   ├── main.py              # Application entry point
│   ├── /routes              # API route definitions
│   ├── /models              # Data models and schemas
│   ├── /config              # Configuration files
│   ├── /services            # Business logic and database operations
│   ├── /utils               # Utility functions
│   └── requirements.txt     # Python dependencies
├── /frontend                # React frontend application
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── index.html           # Main HTML file
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js       # Vite configuration
├── /notebooks               # Jupyter notebooks for data analysis
│   └── data_preprocessing.ipynb
├── /docs                    # Documentation files
│   └── Milestone1_Documentation.md
├── /data                    # Data storage
│   ├── /raw                 # Raw dataset files
│   └── /cleaned             # Cleaned/preprocessed data
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 16+
- MongoDB (Local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd airaware
   ```

2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure environment variables:
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   DATABASE_NAME=airaware
   OPENAI_API_KEY=your_openai_api_key
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application:
   - Backend API: http://localhost:8000
   - Frontend Dashboard: http://localhost:3000

## Documentation

- [Milestone 1 Documentation](./docs/Milestone1_Documentation.md) - Detailed documentation for the first milestone
- [Milestone 2 Documentation](./docs/Milestone2.md) - Machine learning implementation and results
- [Software Architecture](./docs/software_architecture.md) - System architecture diagram and component details
- [Demo Script](./docs/demo_script.md) - Step-by-step guide for demonstrating the system
- [Chatbot Documentation](./docs/chatbot_documentation.md) - AI chatbot implementation details
- [API Documentation](http://localhost:8000/docs) - Auto-generated API documentation (when backend is running)
- [Data Preprocessing Notebook](./notebooks/data_preprocessing.ipynb) - Jupyter notebook for data cleaning and preparation

## Contributing

This project is developed by a team of interns:


- **Lokesh** - MongoDB integration and database design

## License

This project is for educational purposes as part of an internship program and is not licensed for commercial use.