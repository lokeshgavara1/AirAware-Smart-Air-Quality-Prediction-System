import asyncio
import aiohttp
import json

async def test_chatbot():
    url = "http://localhost:8000/api/v1/chatbot"
    
    # Test message
    payload = {
        "message": "What are the health effects of PM2.5?"
    }
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=payload) as response:
                if response.status == 200:
                    data = await response.json()
                    print("Chatbot Response:")
                    print(json.dumps(data, indent=2))
                else:
                    print(f"Error: {response.status}")
                    text = await response.text()
                    print(text)
    except Exception as e:
        print(f"Exception occurred: {e}")

if __name__ == "__main__":
    asyncio.run(test_chatbot())