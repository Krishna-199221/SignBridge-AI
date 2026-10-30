from fastapi import APIRouter
import pickle
from collections import Counter, deque
from pathlib import Path
from threading import Lock

import cv2
import mediapipe as mp
import numpy as np
from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter()

ROOT_DIR = Path(__file__).resolve().parents[2]
MAX_FRAME_BYTES = 5 * 1024 * 1024
STABLE_FRAMES = 5

with (ROOT_DIR / "ai" / "models" / "sign_model.pkl").open("rb") as model_file:
    model = pickle.load(model_file)

landmarker_options = mp.tasks.vision.HandLandmarkerOptions(
    base_options=mp.tasks.BaseOptions(
        model_asset_path=str(ROOT_DIR / "hand_landmarker.task")
    ),
    running_mode=mp.tasks.vision.RunningMode.IMAGE,
    num_hands=2,
)
try:
    landmarker = mp.tasks.vision.HandLandmarker.create_from_options(
        landmarker_options
    )
    landmarker_error = None
except OSError as error:
    landmarker = None
    landmarker_error = str(error)

prediction_history = deque(maxlen=15)
candidate_prediction = None
stable_count = 0
prediction_lock = Lock()


@router.post("/predict")
def predict_sign(image: UploadFile = File(...)):
    global candidate_prediction, stable_count

    if landmarker is None:
        raise HTTPException(
            status_code=503,
            detail=f"Hand recognition runtime unavailable: {landmarker_error}",
        )

    image_bytes = image.file.read(MAX_FRAME_BYTES + 1)
    if len(image_bytes) > MAX_FRAME_BYTES:
        raise HTTPException(status_code=413, detail="Image is too large.")

    frame = cv2.imdecode(
        np.frombuffer(image_bytes, dtype=np.uint8),
        cv2.IMREAD_COLOR,
    )
    if frame is None:
        raise HTTPException(status_code=400, detail="Invalid image.")

    frame = cv2.flip(frame, 1)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame,
    )

    with prediction_lock:
        result = landmarker.detect(mp_image)

        if not result.hand_landmarks:
            prediction_history.clear()
            candidate_prediction = None
            stable_count = 0
            return {
                "prediction": None,
                "stable_prediction": None,
                "stable_count": 0,
            }

        features = [
            coordinate
            for hand in result.hand_landmarks
            for landmark in hand
            for coordinate in (landmark.x, landmark.y, landmark.z)
        ]
        features = (features + [0.0] * 126)[:126]
        prediction = str(model.predict([features])[0])
        prediction_history.append(prediction)
        most_common = Counter(prediction_history).most_common(1)[0][0]

        if most_common == candidate_prediction:
            stable_count += 1
        else:
            candidate_prediction = most_common
            stable_count = 1

    return {
        "prediction": most_common,
        "stable_prediction": (
            candidate_prediction if stable_count >= STABLE_FRAMES else None
        ),
        "stable_count": stable_count,
    }