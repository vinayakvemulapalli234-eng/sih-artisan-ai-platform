from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services import catalog_ai, translate, asr

app = FastAPI(title="Multilingual Auto-Cataloger")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "cataloger service running"}

@app.post("/generate-catalog")
async def generate_catalog(text: str = Form(...)):
    catalog = catalog_ai.generate_catalog(text)
    catalog["translations"] = translate.translate_catalog(
        catalog, target_langs=["hi", "te", "ta", "kn"]
    )
    return catalog


ALLOWED_AUDIO_TYPES = {
    "audio/wav", "audio/x-wav", "audio/wave",
    "audio/mpeg", "audio/mp3", "audio/webm",
    "audio/flac", "audio/ogg", "audio/m4a", "audio/mp4",
}

@app.post("/generate-catalog-from-voice")
async def generate_catalog_from_voice(
    audio: UploadFile = File(...),
    source_lang: str = Form("hi"),
):
    if audio.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(status_code=400, detail=f"Unsupported audio type '{audio.content_type}'.")

    audio_bytes = await audio.read()
    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Empty audio file")

    try:
        transcription = asr.transcribe_audio(audio_bytes, filename=audio.filename, source_lang=source_lang)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Speech recognition failed: {str(e)}")

    catalog = catalog_ai.generate_catalog(transcription)
    catalog["translations"] = translate.translate_catalog(
        catalog, target_langs=["hi", "te", "ta", "kn"]
    )

    return {
        "success": True,
        "transcription": transcription,
        "catalog": {
            "title": catalog["title"],
            "description": catalog["description"],
            "category": catalog["category"],
            "tags": catalog["tags"],
        },
        "translations": catalog["translations"],
    }