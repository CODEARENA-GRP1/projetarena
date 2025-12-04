from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://omar:12345@mongodb:27017/?authSource=admin")

client = MongoClient(MONGO_URI)
db = client["codearena"]

# Collections AUTH
users_collection = db["users"]
blacklist_collection = db["blacklist_tokens"]

# Collections CHALLENGES
challenges_collection = db["challenges"]
submissions_collection = db["submissions"]

rooms_history_collection = db["rooms_history"]