"""
app.py
-------
STEP 11 — Pricing API.

    POST /predict-price
        Product Data -> Flask -> Pricing Model -> Fair Price Check
        -> Price Range -> Explanation -> JSON Response

    GET /health
        quick check the server + model are up

Run:
    python app.py
Then test with test_pricing.py, curl, or Postman (see README.md).
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

from pricing_assistant import get_price_recommendation

app = Flask(__name__)
CORS(app)

MODEL_PATH = "model/pricing_model.pkl"
model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})


@app.route("/predict-price", methods=["POST"])
def predict_price():
    if model is None:
        return jsonify({
            "error": "Model not found. Run `python generate_data.py` then `python train_model.py` first."
        }), 500

    data = request.get_json(silent=True)

    # STEP 12 — never crash on bad input; return a clear 400 instead.
    try:
        result = get_price_recommendation(data, model)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Unexpected server error: {e}"}), 500

    return jsonify(result), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
