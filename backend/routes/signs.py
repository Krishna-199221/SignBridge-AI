from fastapi import APIRouter

router = APIRouter()

signs = [
    "HELLO",
    "THANK YOU",
    "YES",
    "NO",
    "HELP",
    "WATER",
    "FOOD",
    "SORRY",
    "GOOD",
    "STOP"
]


@router.get("/signs")
def get_signs():
    return {
        "count": len(signs),
        "signs": signs
    }


@router.get("/signs/{sign_name}")
def get_sign(sign_name: str):
    sign_name = sign_name.strip().upper()

    if sign_name in signs:
        return {
            "sign": sign_name,
            "available": True,
            "asset": f"/signs/{sign_name.lower().replace(' ', '_')}.gif"
        }

    return {
        "sign": sign_name,
        "available": False,
        "asset": None
    }