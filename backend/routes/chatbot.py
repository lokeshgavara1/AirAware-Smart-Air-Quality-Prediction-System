from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/chatbot", tags=["chatbot"])

# Configure OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "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"))

class ChatMessage(BaseModel):
    message: str

# System prompt for the chatbot
SYSTEM_PROMPT = """You are AirAware Assistant, an AI expert in air quality, pollution, AQI categories, PM2.5 forecasting, and environmental awareness. Explain concepts clearly and provide actionable suggestions."""

@router.post("/")
class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
async def chat_with_bot(chat_message: ChatMessage):
    """
    Chat with the AirAware assistant
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": chat_message.message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        return ChatResponse(reply=response.choices[0].message.content.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))