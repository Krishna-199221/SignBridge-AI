from fastapi import APIRouter

router = APIRouter()


sign_dictionary = {
    "HELLO": "/signs/hello.gif",
    "THANK YOU": "/signs/thank_you.gif",
    "YES": "/signs/yes.gif",
    "NO": "/signs/no.gif",
    "HELP": "/signs/help.gif",
    "WATER": "/signs/water.gif",
    "FOOD": "/signs/food.gif",
    "SORRY": "/signs/sorry.gif",
    "GOOD": "/signs/good.gif",
    "STOP": "/signs/stop.gif"
}


@router.post("/translate")
def translate_text(text: str):
    text = text.strip().upper()

    if text in sign_dictionary:
        return {
            "text": text,
            "sign_found": True,
            "sign_asset": sign_dictionary[text]
        }

    return {
        "text": text,
        "sign_found": False,
        "sign_asset": None,
        "message": "Sign is not available in the current vocabulary."
    }