from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from llm_utils import generate_response
from tinydb import TinyDB  # for history access

app = FastAPI(
    title="NarrativeCraft API",
    description="Generate creative text using LLMs like Mistral. Supports multiple modes (anime, novel, etc).",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load prompt history DB
db = TinyDB("prompt_history.json")

class GenerationRequest(BaseModel):
    mode: str = Field(..., min_length=2, max_length=50)
    user_input: str = Field(..., min_length=5, max_length=1000)

@app.post("/generate/")
async def generate_text(request: GenerationRequest):
    result = generate_response(request.mode, request.user_input)
    return {"output": result}

# Get prompt history
@app.get("/history/")
async def get_history():
    return db.all()

# Health check endpoint
@app.get("/health/")
async def health_check():
    return {"status": "ok"}

@app.get("/modes/")
async def get_modes():
    return {"message": "Any creative mode is supported, like horror, sci-fi, romance, etc."}
