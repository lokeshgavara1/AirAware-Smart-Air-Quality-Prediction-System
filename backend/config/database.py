import motor.motor_asyncio
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "airaware_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "air_quality")

# Create MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
database = client[DATABASE_NAME]
air_quality_collection = database.get_collection(COLLECTION_NAME)

async def connect_to_mongo():
    """Connect to MongoDB"""
    try:
        # The ismaster command is cheap and does not require auth.
        await client.admin.command('ismaster')
        print("MongoDB connection successful")
    except Exception as e:
        print(f"MongoDB connection error: {e}")

async def close_mongo_connection():
    """Close MongoDB connection"""
    client.close()
    print("MongoDB connection closed")