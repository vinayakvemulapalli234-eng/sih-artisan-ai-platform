from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def transcribe_audio(audio_bytes: bytes, filename: str, source_lang: str = "hi") -> str:
    result = client.audio.transcriptions.create(
        file=(filename, audio_bytes),
        model="whisper-large-v3",
        language=source_lang,
    )
    return result.text