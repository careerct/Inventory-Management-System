"""Load the trained demand model and predict a single quantity from date features."""
from pathlib import Path
import joblib
import pandas as pd

MODEL = Path(__file__).parent.parent / "models" / "demand_model.joblib"
if not MODEL.exists():
    raise SystemExit("Train the model first with train.py")
model = joblib.load(MODEL)

date = pd.Timestamp.today()
features = pd.DataFrame([[date.day, date.month, date.year]], columns=["day", "month", "year"])
print(float(model.predict(features)[0]))
