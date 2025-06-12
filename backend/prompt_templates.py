def build_prompt(mode: str, user_input: str) -> str:
    """
    Builds a structured prompt to guide LLM storytelling.
    """
    return f"""
You are a creative writing AI trained to generate compelling and imaginative stories.

📝 Task: Write a {mode.lower()} story.
🎯 Theme or Idea: "{user_input}"

✨ Instructions:
- Use rich, vivid language and sensory details.
- Create interesting characters and meaningful conflict.
- Include a beginning, middle, and end.
- Reflect the mood and style of the genre "{mode}".
- Write at least 3 paragraphs.

Respond only with the story. Do not include any notes or disclaimers.
"""
