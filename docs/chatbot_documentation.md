# Chatbot Module Documentation

## Overview

The Chatbot module is an AI-powered feature of the AirAware system that provides users with instant access to air quality information, explanations, and recommendations through a conversational interface. It leverages the OpenAI GPT-3.5 Turbo model to understand and respond to user queries about air quality.

## Features

- Natural language processing for air quality related questions
- Real-time responses based on current and historical data
- Health recommendations for different AQI levels
- Explanations of pollutants and their effects
- Information about AirAware system features
- High-level explanations of machine learning models

## Technical Implementation

### Backend

The backend component consists of:

1. **API Endpoint**: `/api/v1/chatbot` (POST)
2. **Request Body**: `{ "message": "user query" }`
3. **Response Format**: `{ "response": "AI generated response" }`
4. **Integration**: OpenAI GPT-3.5 Turbo model
5. **System Prompt**: "You are AirAware Assistant, an intelligent air-quality chatbot. Explain pollutants, AQI, predictions, environmental awareness, and health safety in simple terms."

### Frontend

The frontend component includes:

1. **Chat Interface**: Visual chat bubbles for user and bot messages
2. **Input Box**: Text area for user queries
3. **Loading Indicator**: Shows when waiting for AI response
4. **Quick Suggestions**: Predefined questions for easy access
5. **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

### Chat with Bot

```
POST /api/v1/chatbot
```

#### Request Body
```json
{
  "message": "string"
}
```

#### Response
```json
{
  "response": "string"
}
```

#### Example
```bash
curl -X POST "http://localhost:8000/api/v1/chatbot" \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the health effects of PM2.5?"}'
```

## Setup Instructions

1. Add your OpenAI API key to the backend `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. Install the required dependencies:
   ```bash
   pip install openai>=0.27.0
   ```

3. Ensure the chatbot route is included in `main.py`:
   ```python
   from routes import chatbot
   app.include_router(chatbot.router, prefix="/api/v1")
   ```

## Usage Examples

Users can ask questions like:

- "What is the current AQI in Delhi?"
- "What are the health effects of PM2.5?"
- "How does the air quality prediction work?"
- "What precautions should I take today?"
- "Explain the difference between PM2.5 and PM10"

## Error Handling

The chatbot includes error handling for:

- Network connectivity issues
- API rate limiting
- Invalid requests
- Server errors

In case of errors, users will receive a friendly error message indicating the issue.