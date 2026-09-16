"""Starter ML training script. Supply historical sales CSV with product/date/quantity columns."""
import pandas as pd
from pathlib import Path
from sklearn.ensemble import RandomForestRegressor
import joblib

DATA = Path(__file__).parent.parent / "data" / "sales.csv"
MODEL = Path(__file__).parent.parent / "models" / "demand_model.joblib"

if not DATA.exists():
    raise SystemExit("Create ai/data/sales.csv with product,date,quantity before training.")

df = pd.read_csv(DATA)
df["date"] = pd.to_datetime(df["date"])
df["day"] = df["date"].dt.day
df["month"] = df["date"].dt.month
df["year"] = df["date"].dt.year
X = df[["day", "month", "year"]]
y = df["quantity"]
model = RandomForestRegressor(n_estimators=200, random_state=42)
model.fit(X, y)
MODEL.parent.mkdir(parents=True, exist_ok=True)
joblib.dump(model, MODEL)
print(f"Model saved to {MODEL}")
