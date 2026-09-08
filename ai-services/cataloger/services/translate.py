from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

LANG_NAMES = {
    "hi": "Hindi",
    "te": "Telugu",
    "ta": "Tamil",
    "kn": "Kannada",
    "en": "English",
}

def translate_text(text: str, target_lang: str) -> str:
    if target_lang == "en":
        return text
    lang_name = LANG_NAMES.get(target_lang, target_lang)
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{
            "role": "user",
            "content": f"Translate this text to {lang_name}. "
                        f"Return ONLY the translation, nothing else:\n\n{text}"
        }],
    )
    return response.choices[0].message.content.strip()


def translate_catalog(catalog: dict, target_langs: list[str]) -> dict:
    translations = {}
    for lang in target_langs:
        translations[lang] = {
            "title": translate_text(catalog["title"], lang),
            "description": translate_text(catalog["description"], lang),
        }
    return translations