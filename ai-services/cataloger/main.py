from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Form
from services import catalog_ai, translate

app = FastAPI(title="Multilingual Auto-Cataloger")

@app.get("/")
def health():
    return {"status": "cataloger service running"}

@app.post("/generate-catalog")
async def generate_catalog(
    text: str = Form(...),
):
    catalog = catalog_ai.generate_catalog(text)
    catalog["translations"] = translate.translate_catalog(
        catalog, target_langs=["hi", "te", "ta", "kn"]
    )
    return catalog