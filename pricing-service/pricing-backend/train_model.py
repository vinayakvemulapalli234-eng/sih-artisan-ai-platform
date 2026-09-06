"""
train_model.py
----------------
STEP 5 — Train the ML pricing model (Random Forest Regressor, as recommended).
STEP 6 — Evaluate it honestly with MAE, RMSE, and R^2 on held-out test data.

Run:
    python train_model.py
"""

import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

DATA_PATH = "data/pricing_data.csv"
MODEL_PATH = "model/pricing_model.pkl"

df = pd.read_csv(DATA_PATH)

FEATURES = ["category", "material_cost", "labour_hours", "labour_rate",
            "complexity", "quality", "demand", "uniqueness"]
TARGET = "selling_price"

X = df[FEATURES]
y = df[TARGET]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

preprocess = ColumnTransformer(
    transformers=[("category", OneHotEncoder(handle_unknown="ignore"), ["category"])],
    remainder="passthrough",
)

model = RandomForestRegressor(n_estimators=300, max_depth=8, random_state=42)
pipeline = Pipeline(steps=[("preprocess", preprocess), ("model", model)])

pipeline.fit(X_train, y_train)
preds = pipeline.predict(X_test)

mae = mean_absolute_error(y_test, preds)
rmse = np.sqrt(mean_squared_error(y_test, preds))
r2 = r2_score(y_test, preds)

print("STEP 6 — Model evaluation on held-out test data:")
print(f"  MAE  (avg. Rs. error)      : Rs.{mae:.2f}")
print(f"  RMSE (penalizes big misses): Rs.{rmse:.2f}")
print(f"  R^2  (0-1, higher=better)  : {r2:.3f}")
print("\nNote: these numbers come from a synthetic dataset. Report them honestly as")
print("'trained and evaluated on synthetic data' — do not present as a claimed accuracy")
print("on a real market, since no real dataset exists yet.")

joblib.dump(pipeline, MODEL_PATH)
print(f"\nSaved trained model to {MODEL_PATH}")
