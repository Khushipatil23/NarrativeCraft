"use client"

import { useState } from "react"
import "./App.css"
import { Moon, Sun, Sparkles, BookOpen, History, Trash2, Copy, Home } from "lucide-react"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [showMainPage, setShowMainPage] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const goBackToLanding = () => {
    setShowMainPage(false)
    setShowHistory(false)
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!prompt.trim()) return;

  try {
    const res = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
       mode: "general",           // or let user choose a mode in future
       user_input: prompt
      }),
    });

    const data = await res.json();
    const generatedStory = data.output;
    setOutput(generatedStory);

    // Add to history
    const newHistoryItem = {
      id: Date.now(),
      prompt: prompt,
      output: generatedStory,
      timestamp: new Date().toLocaleString(),
    };
    setHistory((prev) => [newHistoryItem, ...prev]);
    setPrompt("");
  } catch (err) {
    console.error("Failed to generate story:", err);
    setOutput("Error: Failed to generate story. Please try again.");
  }
};

  const loadFromHistory = (item) => {
    setPrompt(item.prompt)
    setOutput(item.output)
    setShowHistory(false)
  }

  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const clearHistory = () => {
    setHistory([])
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="background-effects">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
          <div className="shape shape-7"></div>
        </div>
        <div className="gradient-overlay"></div>
        <div className="texture-overlay"></div>
      </div>

      {!showMainPage ? (
        // Landing Page
        <div className="landing-page">
          <button
            className="theme-toggle landing-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="landing-content">
            <div className="icon-container">
              <BookOpen className="book-icon" size={64} />
              <div className="icon-glow"></div>
            </div>
            <h1 className="main-title">NarrativeCraft</h1>
            <h2 className="subtitle">AI-Powered Story Generator & Multimedia Script Assistant</h2>
            <p className="description">
              Transform your ideas into captivating stories and professional scripts with the power of artificial
              intelligence. NarrativeCraft helps you break through writer's block and develop compelling narratives for
              any medium.
            </p>
            <button className="enter-button" onClick={() => setShowMainPage(true)}>
              <span>Begin Your Story</span>
              <Sparkles size={16} />
              <div className="button-glow"></div>
            </button>
          </div>
        </div>
      ) : (
        // Main Application Page
        <div className="main-page">
          <header>
            <div className="header-left">
              <button className="back-button" onClick={goBackToLanding} title="Back to Home">
                <Home size={20} />
              </button>
              <h1>NarrativeCraft</h1>
            </div>
            <div className="header-controls">
              <button
                className="history-toggle"
                onClick={() => setShowHistory(!showHistory)}
                aria-label="Toggle history"
              >
                <History size={20} />
              </button>
            </div>
          </header>

          <div className="main-content">
            <div className="content-area">
              <div className="input-section">
                <h2>Create Your Story</h2>
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your story idea or provide a prompt..."
                    rows={6}
                  ></textarea>
                  <button type="submit" className="generate-button">
                    <span>Generate Story</span>
                    <Sparkles size={16} />
                    <div className="button-ripple"></div>
                  </button>
                </form>
              </div>

              {output && (
                <div className="output-section">
                  <div className="output-header">
                    <h2>Your Generated Story</h2>
                    <button className="copy-button" onClick={() => copyToClipboard(output)} title="Copy to clipboard">
                      <Copy size={16} />
                    </button>
                  </div>
                  <div className="story-output">
                    {output.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* History Sidebar */}
            <div className={`history-sidebar ${showHistory ? "show" : ""}`}>
              <div className="history-header">
                <h3>History</h3>
                <button className="clear-history" onClick={clearHistory} title="Clear all history">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="history-list">
                {history.length === 0 ? (
                  <p className="no-history">No stories generated yet</p>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="history-item">
                      <div className="history-content" onClick={() => loadFromHistory(item)}>
                        <p className="history-prompt">{item.prompt.substring(0, 50)}...</p>
                        <span className="history-time">{item.timestamp}</span>
                      </div>
                      <button
                        className="delete-item"
                        onClick={() => deleteHistoryItem(item.id)}
                        title="Delete this item"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
