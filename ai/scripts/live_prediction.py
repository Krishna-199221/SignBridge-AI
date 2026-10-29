import cv2
import numpy as np
import mediapipe as mp
import pickle
import pyttsx3
import threading
from collections import deque, Counter


# ==============================
# Speech function
# ==============================

def speak(text):
    engine = pyttsx3.init()
    engine.setProperty("rate", 120)
    engine.setProperty("volume", 1.0)

    engine.say(text)
    engine.runAndWait()

    engine.stop()


# ==============================
# Presentation introduction
# ==============================

def speak_introduction():
    speak(
        "Hello, how are you? "
        "We are team members Ritika, Pranjali and Sandesh."
    )


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

last_spoken = None

speech_thread = None


# ==============================
# Stability settings
# ==============================

candidate_prediction = None
stable_count = 0

STABLE_FRAMES = 12


# ==============================
# Start camera
# ==============================

cap = cv2.VideoCapture(0)


while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame = cv2.flip(frame, 1)

    rgb = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb
    )

    result = landmarker.detect(mp_image)

    features = []


    # ==============================
    # Hand detected
    # ==============================

    if result.hand_landmarks:

        for hand in result.hand_landmarks:

            for landmark in hand:

                features.extend([
                    landmark.x,
                    landmark.y,
                    landmark.z
                ])


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
        # Display prediction
        # ==============================

        cv2.putText(
            frame,
            "Prediction: " + most_common,
            (20, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            "Stable: " + str(stable_count),
            (20, 90),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 255),
            2
        )


        # ==============================
        # Speak stable prediction
        # ==============================

        if stable_count >= STABLE_FRAMES:

            if candidate_prediction != last_spoken:

                if (
                    speech_thread is None
                    or not speech_thread.is_alive()
                ):

                    speech_text = (
                        candidate_prediction
                        .replace("_", " ")
                    )

                    speech_thread = threading.Thread(
                        target=speak,
                        args=(speech_text,),
                        daemon=True
                    )

                    speech_thread.start()

                    last_spoken = candidate_prediction


        # ==============================
        # Draw landmarks
        # ==============================

        for hand in result.hand_landmarks:

            for landmark in hand:

                h, w, _ = frame.shape

                x = int(
                    landmark.x * w
                )

                y = int(
                    landmark.y * h
                )

                cv2.circle(
                    frame,
                    (x, y),
                    5,
                    (0, 255, 0),
                    -1
                )


    # ==============================
    # No hand detected
    # ==============================

    else:

        prediction_history.clear()

        candidate_prediction = None

        stable_count = 0

        last_spoken = None


    # ==============================
    # Presentation instruction
    # ==============================

    cv2.putText(
        frame,
        "Press I = Team Introduction",
        (20, 130),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.65,
        (255, 255, 255),
        2
    )


    # ==============================
    # Show camera
    # ==============================

    cv2.imshow(
        "SignBridge AI - Live Prediction",
        frame
    )


    # ==============================
    # Keyboard controls
    # ==============================

    key = cv2.waitKey(1) & 0xFF

    if key == ord("i"):

        if (
            speech_thread is None
            or not speech_thread.is_alive()
        ):

            speech_thread = threading.Thread(
                target=speak_introduction,
                daemon=True
            )

            speech_thread.start()


    if key == ord("q"):

        break


# ==============================
# Cleanup
# ==============================

cap.release()

cv2.destroyAllWindows()


