from groq import Groq
import os, json

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_catalog(description: str) -> dict:
    prompt = f"""
You are helping an artisan list a handmade product on a marketplace.
Raw description: "{description}"

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