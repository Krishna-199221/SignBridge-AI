
import re
from pathlib import Path

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

SIGNS_DIR = Path(__file__).resolve().parents[1] / "static" / "signs"

# Only map phrases to assets that actually exist in our project.
SIGN_DICTIONARY = {
    "HELLO": "hello.gif",
    "GOOD MORNING": "good_morning.gif",
    "GOOD AFTERNOON": "good_afternoon.gif",
    "I AM FINE": "i_am_fine.gif",
}


class TranslateRequest(BaseModel):
    text: str


@router.post("/translate")
def translate_text(request: TranslateRequest):
    text = " ".join(
        re.sub(r"[^\w\s]", " ", request.text).upper().split()
    )

    if not text:
        return {
            "text": "",
            "signs": [],
            "message": "Please enter some text."
        }

    words = text.split()
    results = []
    index = 0

    # Match longer phrases before individual words.
    while index < len(words):
        matched = False

        for length in range(min(4, len(words) - index), 0, -1):
            phrase = " ".join(words[index:index + length])

            if phrase in SIGN_DICTIONARY:
                filename = SIGN_DICTIONARY[phrase]
                file_path = SIGNS_DIR / filename
                video_exists = file_path.is_file()

                results.append({
                    "text": phrase,
                    "sign_found": video_exists,
                    "sign_asset": (
                        f"/static/signs/{filename}"
                        if video_exists else None
                    ),
                    "message": (
                        "Sign animation available."
                        if video_exists
                        else "Mapped sign asset is missing."
                    )
                })

                index += length
                matched = True
                break

        if not matched:
            results.append({
                "text": words[index],
                "sign_found": False,
                "sign_asset": None,
                "message": "No matching sign animation is available yet."
            })
            index += 1

    return {
        "text": text,
        "signs": results
    }
