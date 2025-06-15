# 🎭 NarrativeCraft: AI-Powered Story Generator & Multimedia Script Assistant

NarrativeCraft is a full-stack creative writing tool that uses Large Language Models (LLMs) to generate:

- ✨ Rich fictional stories  
- 🎬 Multimedia-ready scripts (with scenes, directions, sound cues, dialogues)  
- 📚 Creative content for film, games, animation, and more  

## 🧠 Tech Stack

| Part        | Tech                                |
|-------------|-------------------------------------|
| Backend     | FastAPI, Ollama, LLaMA 3 (local LLM) |
| Frontend    | React.js (Create React App)          |
| LLM Runner  | Ollama (runs locally on your device) |
| Prompt DB   | TinyDB (lightweight JSON database)   |

## 🚀 Features

- 📝 Generate engaging stories and screenplays with vivid structure
- 🎥 Script formatting: camera directions, ambient sound cues, scene transitions, and character dialogue
- 🧠 Uses LLaMA 3 locally via Ollama — completely free and offline
- 🔁 TinyDB integration to log past prompts and generated responses
- 🌐 Seamless integration between frontend and backend

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/NarrativeCraft.git
cd NarrativeCraft
``` 
### 2. Backend Setup (FastAPI + Ollama)
a. Start Ollama and pull LLaMA 3:
```bash
ollama serve
ollama pull llama3
```
b. Create and run the FastAPI server:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
✅ Make sure ollama serve is running on port 11434 before hitting the API.

### 3. Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```
Open your browser at http://localhost:3000 to use NarrativeCraft.

### 🧪 Example Prompts
#### Story Mode
```bash
"A detective who uncovers a secret society beneath New York City."
```

#### Script Mode
```bash
"A psychological thriller scene set in an abandoned subway tunnel, involving a journalist and a mysterious stranger."
```

### 📜 License
MIT License. Feel free to modify and extend for learning or production use.

### 🧠 Credits

LLaMA 3 via Ollama

FastAPI for backend

React + CRA for frontend

### 🎬 Demo Video
[Click here to watch the demo](https://drive.google.com/file/d/1Q8Je9wfNCVaCqXfrvG7ktebwoSRhmH4E/view?usp=drive_link)
