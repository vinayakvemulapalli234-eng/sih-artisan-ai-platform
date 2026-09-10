from groq import Groq
from dotenv import load_dotenv
import os, json

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_catalog(description: str) -> dict:
    prompt = f"""
You are helping an Indian artisan list a handmade product on a marketplace.
The description below was transcribed from spoken Indian-language input,
so use common Indian handicraft/jewelry terminology (e.g. "bangle" not
"bracelet", "anklet" not "ankle chain") wherever it fits better.

Raw description: "{description}"

Only mention a color if the description explicitly states one - do not
invent or assume a color that wasn't mentioned.

Return ONLY valid JSON with this exact structure:
{{
  "title": "short catchy title, under 8 words",
  "description": "2-3 sentence appealing description",
  "category": "pottery / textiles / jewelry / woodwork / etc",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}}
"""
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )
    return json.loads(response.choices[0].message.content)
