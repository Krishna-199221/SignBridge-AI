from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.predict import router as predict_router
from backend.routes.signs import router as signs_router
from backend.routes.translate import router as translate_router
from fastapi.staticfiles import StaticFiles
app = FastAPI(
    title="SignBridge-AI Backend",
    description="API for sign language communication",
    version="1.0.0",
)

app.mount(
    "/static",
    StaticFiles(
        directory=str(Path(__file__).resolve().parent / "static")
    ),
    name="static",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(signs_router)
app.include_router(translate_router)


@app.get("/")
def home():
    return {
        "message": "SignBridge-AI backend is running"
    }


@app.get("/health")
def health():
    return {"status": "ok"}
