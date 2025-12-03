from pydantic import BaseModel
from typing import List, Any

class TestCase(BaseModel):
    input: Any
    expected: Any

class Challenge(BaseModel):
    title: str
    difficulty: str
    language: List[str]
    points: int
    is_active: bool
    description: str
    solution_code: str
    test_cases: List[TestCase]
