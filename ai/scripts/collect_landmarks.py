import cv2
import mediapipe as mp
import csv
import os

BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

options = HandLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path="hand_landmarker.task"
    ),
    running_mode=VisionRunningMode.IMAGE,
    num_hands=2
)

landmarker = HandLandmarker.create_from_options(options)

os.makedirs("ai/data", exist_ok=True)

file_path = "ai/data/landmarks.csv"

sign = input("Enter the sign label (example: HELLO): ").strip().upper()

if not sign:
    print("No label entered.")
    landmarker.close()
    exit()

file_exists = os.path.exists(file_path)

with open(file_path, "a", newline="") as file:
    writer = csv.writer(file)

    if not file_exists or os.path.getsize(file_path) == 0:
        header = []

        for hand in range(2):
            for point in range(21):
                header.extend([
                    f"hand{hand}_x{point}",
                    f"hand{hand}_y{point}",
                    f"hand{hand}_z{point}"
                ])

        header.append("label")
        writer.writerow(header)

    cap = cv2.VideoCapture(0)

    print()
    print("Camera started.")
    print("Press SPACE to capture a sample.")
    print("Press Q to stop.")
    print()

    sample_count = 0

    while True:
        ret, frame = cap.read()

        if not ret:
            print("Camera not working")
            break

        frame = cv2.flip(frame, 1)

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        mp_image = mp.Image(
            image_format=mp.ImageFormat.SRGB,
            data=rgb_frame
        )

        result = landmarker.detect(mp_image)

        if result.hand_landmarks:

            for hand_landmarks in result.hand_landmarks:

                for landmark in hand_landmarks:

                    x = int(landmark.x * frame.shape[1])
                    y = int(landmark.y * frame.shape[0])

                    cv2.circle(
                        frame,
                        (x, y),
                        5,
                        (0, 255, 0),
                        -1
                    )

        cv2.putText(
            frame,
            f"Sign: {sign} | Samples: {sample_count}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 0),
            2
        )

        cv2.imshow("SignBridge - Data Collection", frame)

        key = cv2.waitKey(1) & 0xFF

        if key == ord("q"):
            break

        if key == 32:

            if result.hand_landmarks:

                row = []

                for hand_index in range(2):

                    if hand_index < len(result.hand_landmarks):

                        hand = result.hand_landmarks[hand_index]

                        for landmark in hand:
                            row.extend([
                                landmark.x,
                                landmark.y,
                                landmark.z
                            ])

                    else:

                        row.extend([0.0] * 63)

                row.append(sign)

                writer.writerow(row)
                file.flush()

                sample_count += 1

                print(f"Captured sample {sample_count} for {sign}")

            else:
                print("No hand detected. Try again.")

    cap.release()

landmarker.close()

print()
print(f"Finished collecting {sample_count} samples for {sign}.")