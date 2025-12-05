from fastapi import APIRouter, HTTPException
from bson import ObjectId
from time import perf_counter
import asyncio

from app.models.challenge_model import Challenge
from app.utils.db import challenges_collection, submissions_collection
from app.utils.room_manager import room_manager

router = APIRouter()

# -------------------------------------
# GET all challenges
# -------------------------------------
@router.get("/challenges")
def get_challenges(limit: int = 10):
    challenges = list(
        challenges_collection.find(
            {},
            {
                "title": 1,
                "difficulty": 1,
                "language": 1,
                "points": 1,
                "is_active": 1
            }
        ).limit(limit)
    )

    # convert ObjectId to str
    for c in challenges:
        c["_id"] = str(c["_id"])

    return challenges


# -------------------------------------
# GET one challenge by ID
# -------------------------------------
@router.get("/challenges/{challenge_id}")
def get_challenge(challenge_id: str):
    challenge = challenges_collection.find_one({"_id": ObjectId(challenge_id)})
    if not challenge:
        raise HTTPException(404, "Challenge not found")

    challenge["_id"] = str(challenge["_id"])
    challenge.pop("solution_code", None)  # sécurité

    return challenge


# -------------------------------------
# POST SUBMIT + SCORE + MULTIPLAYER
# -------------------------------------
@router.post("/challenges/{challenge_id}/submit")
def submit_challenge(
    challenge_id: str,
    code: str,
    user_id: str = "test-user",
    room_id: str | None = None
):
    # 1️⃣ Récupérer le challenge
    challenge = challenges_collection.find_one({"_id": ObjectId(challenge_id)})
    if not challenge:
        raise HTTPException(404, "Challenge not found")

    test_cases = challenge["test_cases"]
    base_points = challenge["points"]

    results_ok = True
    output_user = []

    # 2️⃣ Mesurer le temps d'exécution
    start_time = perf_counter()
    operation_count = 0

    # 3️⃣ Exécuter le code utilisateur
    try:
        local_vars = {}
        exec(code, {}, local_vars)
        func = list(local_vars.values())[0]
    except Exception as e:
        return {"status": "failed", "error": "Code error: " + str(e)}

    # 4️⃣ Tester les cas
    for test in test_cases:
        try:
            operation_count += 1
            if isinstance(test["input"], list):
                result = func(*test["input"])
            else:
                result = func(test["input"])

            output_user.append(result)
            if result != test["expected"]:
                results_ok = False
        except Exception as e:
            output_user.append("Error: " + str(e))
            results_ok = False

    execution_time = perf_counter() - start_time

    # -----------------------------
    # CALCUL DU SCORE
    # -----------------------------
    time_score = max(1, int(100 / (execution_time + 0.01)))
    efficiency_score = max(1, int(100 / (operation_count + 1)))
    final_score = base_points + time_score + efficiency_score

    # -----------------------------
    # SAUVEGARDE SUBMISSION
    # -----------------------------
    submission = {
        "user_id": user_id,
        "challenge_id": challenge_id,
        "submitted_code": code,
        "output_user": output_user,
        "result": "success" if results_ok else "failed",
        "execution_time": execution_time,
        "operation_count": operation_count,
        "final_score": final_score
    }
    submissions_collection.insert_one(submission)

    # -----------------------------
    # MODE MULTIJOUEUR (OPTIONNEL)
    # -----------------------------
    if room_id:
        current_score = room_manager.update_score(
            room_id,
            user_id,
            final_score,
            final=True
        )

        asyncio.create_task(
            room_manager.broadcast(
                room_id,
                {
                    "type": "score",
                    "username": user_id,
                    "score": current_score,
                    "final": True
                }
            )
        )

    # -----------------------------
    # RÉPONSE
    # -----------------------------
    return {
        "status": submission["result"],
        "outputs": output_user,
        "execution_time": execution_time,
        "operations": operation_count,
        "final_score": final_score,
        "room_update": "sent" if room_id else None
    }
