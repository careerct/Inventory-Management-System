"""Simple statistical anomaly helper for transaction quantities."""
import numpy as np

def anomaly_flags(values, z_threshold=3.0):
    values = np.asarray(values, dtype=float)
    if len(values) < 2:
        return np.zeros(len(values), dtype=bool)
    std = values.std()
    if std == 0:
        return np.zeros(len(values), dtype=bool)
    z = np.abs((values - values.mean()) / std)
    return z >= z_threshold
