from fastapi import APIRouter

router = APIRouter()


@router.post("/predict")
def predict_sign(sign: str):
    return {
        "predicted_sign": sign,
        "message": f"Detected sign: {sign}"
    }