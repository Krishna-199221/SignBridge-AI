from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import mediapipe as mp
import pickle
from collections import deque, Counter


# ==============================
# Flask setup
# ==============================

app = Flask(__name__)
CORS(app)


# ==============================
# Load trained model
# ==============================

with open("ai/models/sign_model.pkl", "rb") as f:
    model = pickle.load(f)


# ==============================
# MediaPipe setup
# ==============================

BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
RunningMode = mp.tasks.vision.RunningMode

options = HandLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path="hand_landmarker.task"
    ),
    running_mode=RunningMode.IMAGE,
    num_hands=2
)

landmarker = HandLandmarker.create_from_options(options)


# ==============================
# Prediction history
# ==============================

prediction_history = deque(maxlen=15)

candidate_prediction = None
stable_count = 0

STABLE_FRAMES = 5


# ==============================
# Prediction endpoint
# ==============================

@app.route("/predict", methods=["POST"])
def predict():

    global candidate_prediction
    global stable_count

    # ==============================
    # Check image
    # ==============================

    if "image" not in request.files:
        return jsonify({
            "error": "No image received"
        }), 400

    file = request.files["image"]

    image_bytes = file.read()

    image_array = np.frombuffer(
        image_bytes,
        np.uint8
    )

    frame = cv2.imdecode(
        image_array,
        cv2.IMREAD_COLOR
    )

    if frame is None:
        return jsonify({
            "error": "Invalid image"
        }), 400


    # ==============================
    # IMPORTANT:
    # Match live_prediction.py
    # ==============================

    frame = cv2.flip(frame, 1)


    # ==============================
    # Convert image for MediaPipe
    # ==============================

    rgb = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb
    )

    result = landmarker.detect(mp_image)
    print(
      "Hands detected:",
       len(result.hand_landmarks)
    )


    # ==============================
    # No hand detected
    # ==============================

    if not result.hand_landmarks:

        prediction_history.clear()

        candidate_prediction = None
        stable_count = 0

        return jsonify({
            "prediction": None,
            "stable_prediction": None,
            "stable_count": 0
        })


    # ==============================
    # Extract landmarks
    # ==============================

    features = []

    for hand in result.hand_landmarks:

        for landmark in hand:

            features.extend([
                landmark.x,
                landmark.y,
                landmark.z
            ])


    # ==============================
    # Pad to 126 features
    # ==============================

    while len(features) < 126:

        features.extend([
            0,
            0,
            0
        ])


    features = features[:126]


    # ==============================
    # Model prediction
    # ==============================

    prediction = model.predict(
        [features]
    )[0]


    prediction_history.append(
        prediction
    )


    # ==============================
    # Majority vote
    # ==============================

    most_common = Counter(
        prediction_history
    ).most_common(1)[0][0]


    # ==============================
    # Stability check
    # ==============================

    if most_common == candidate_prediction:

        stable_count += 1

    else:

        candidate_prediction = most_common
        stable_count = 1


    # ==============================
    # Return result
    # ==============================

    return jsonify({
        "prediction": most_common,

        "stable_prediction": (
            candidate_prediction
            if stable_count >= STABLE_FRAMES
            else None
        ),

        "stable_count": stable_count
    })


# ==============================
# Start backend
# ==============================

if __name__ == "__main__":

    print("SignBridge-AI backend starting...")
    print("Backend running at http://127.0.0.1:5000")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )
