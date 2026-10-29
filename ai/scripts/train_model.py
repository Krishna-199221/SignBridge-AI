import csv
import os
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


DATA_FILE = "ai/data/landmarks.csv"
MODEL_DIR = "ai/models"
MODEL_FILE = "ai/models/sign_model.pkl"


X = []
y = []


with open(DATA_FILE, "r", newline="") as file:
    reader = csv.DictReader(file)

    for row in reader:
        features = []

        for key, value in row.items():
            if key != "label":
                features.append(float(value))

        X.append(features)
        y.append(row["label"])


print("Total samples:", len(X))
print("Signs:", sorted(set(y)))


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)


print("Training model...")

model.fit(X_train, y_train)


predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"Model accuracy: {accuracy * 100:.2f}%")


os.makedirs(MODEL_DIR, exist_ok=True)

with open(MODEL_FILE, "wb") as file:
    pickle.dump(model, file)


print("Model saved successfully.")
print("Saved at:", MODEL_FILE)