import logging
import requests
import time
from prompt_templates import build_prompt
from tinydb import TinyDB
from datetime import datetime

logging.basicConfig(
    filename="server.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s:%(message)s"
)

db = TinyDB("prompt_history.json")

def clean_output(raw_output: str) -> str:
    output = raw_output.strip()
    output = output.replace("Sure, here's", "")
    output = output.replace("Here's", "")
    output = output.lstrip(":\n ")
    return output.strip()

def generate_response(mode: str, user_input: str) -> str:
    prompt = build_prompt(mode, user_input)

    try:
        start_time = time.time()

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3:latest",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.5,
                    "top_p": 0.7,
                    "top_k": 20
                }
            },
            timeout=180
        )

        duration = time.time() - start_time
        logging.info(f"LLM response took {duration:.2f} seconds")

        if response.status_code != 200:
            logging.error("Ollama error: %s", response.text)
            return "Error generating response. Check Ollama logs."

        data = response.json()
        output = clean_output(data.get("response", ""))

        # Log to TinyDB
        db.insert({
            "timestamp": datetime.now().isoformat(),
            "mode": mode,
            "user_input": user_input,
            "output": output
        })

        return output

    except Exception as e:
        logging.error("Unexpected error: %s", str(e))
        return "Internal server error while generating response."
