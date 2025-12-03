from fastapi import APIRouter, HTTPException
from bson import ObjectId
from app.models.challenge_model import Challenge
from app.utils.db import challenges_collection, submissions_collection


router = APIRouter()


# GET all challenges (10 first)
@router.get("/challenges")
def get_challenges(limit: int = 10):
    challenges = list(challenges_collection.find({}, {
        "title": 1,
        "difficulty": 1,
        "language": 1,
        "points": 1,
        "is_active": 1
    }).limit(limit))

    # convertir ObjectId en str
    for c in challenges:
        c["_id"] = str(c["_id"])

    return challenges


# GET one challenge by ID
@router.get("/challenges/{challenge_id}")
def get_challenge(challenge_id: str):
    challenge = challenges_collection.find_one({"_id": ObjectId(challenge_id)})
    if not challenge:
        raise HTTPException(404, "Challenge not found")

    challenge["_id"] = str(challenge["_id"])
    challenge.pop("solution_code")  # ne jamais envoyer la solution correcte !

    return challenge


# POST submit a challenge
@router.post("/challenges/{challenge_id}/submit")
def submit_challenge(challenge_id: str, code: str, user_id: str = "test-user"):
    challenge = challenges_collection.find_one({"_id": ObjectId(challenge_id)})
    if not challenge:
        raise HTTPException(404, "Challenge not found")

    solution = challenge["solution_code"]
    test_cases = challenge["test_cases"]

    results_ok = True
    output_user = []

    for test in test_cases:
        try:
            local_vars = {}
            exec(code, {}, local_vars)
            func = list(local_vars.values())[0]

        # si input est une liste, on la "dépaquette"
            if isinstance(test["input"], list):
               result = func(*test["input"])
            else:
               result = func(test["input"])

            output_user.append(result)
            if result != test["expected"]:
               results_ok = False

        except Exception:
            results_ok = False

    submission = {
        "user_id": user_id,
        "challenge_id": challenge_id,
        "submitted_code": code,
        "output_user": output_user,
        "result": "success" if results_ok else "failed"
    }

    submissions_collection.insert_one(submission)

    return {
        "status": submission["result"],
        "outputs": output_user
    }
