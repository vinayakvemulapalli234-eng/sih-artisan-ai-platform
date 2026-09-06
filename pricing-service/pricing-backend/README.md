# Dynamic Pricing Assistant — built to the 12-step spec

This has been run end-to-end here already: dataset generated, model trained
and evaluated, all 13 test cases (5 normal + 8 edge cases) passed correctly,
and the live Flask API was hit with curl and returned correct JSON. The
outputs below are real, copied from that run — not made up.

## Where each step lives

| Step | What it does | File |
|---|---|---|
| 1 | Define what the assistant should output | `pricing_assistant.py` (docstring) + this README |
| 2 | Input features | `category, material_cost, labour_hours, labour_rate, complexity, quality, demand, uniqueness` — used everywhere below |
| 3 | Build the dataset (documented as synthetic) | `generate_data.py` |
| 4 | Baseline rule-based calculator | `pricing_assistant.py` → `baseline_calculator()` |
| 5 | Train the ML model (Random Forest) | `train_model.py` |
| 6 | Evaluate with MAE / RMSE / R² | `train_model.py` (prints real numbers, see below) |
| 7 | Fair-price protection | `pricing_assistant.py` → `fair_price_check()` |
| 8 | Price range (min/recommended/max) | `pricing_assistant.py` → `build_price_range()` |
| 9 | Explanation breakdown | `pricing_assistant.py` → `build_explanation()` |
| 10 | Dynamic demand adjustment | `pricing_assistant.py` → `dynamic_demand_multiplier()` |
| 11 | Flask API | `app.py` → `POST /predict-price` |
| 12 | Testing (normal + edge cases) | `test_pricing.py` |

## How to run it in VS Code

Open this folder in VS Code, open a terminal (`` Ctrl+` ``), then:

```bash
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt

python generate_data.py         # Step 3 — creates data/pricing_data.csv
python train_model.py           # Steps 5 & 6 — trains, evaluates, saves the model
python test_pricing.py          # Step 12 — runs 13 test cases, no server needed
python app.py                   # Step 11 — starts the API on http://127.0.0.1:5000
```

## Real output from Step 6 (model evaluation)

```
STEP 6 — Model evaluation on held-out test data:
  MAE  (avg. Rs. error)      : Rs.132.12
  RMSE (penalizes big misses): Rs.186.82
  R^2  (0-1, higher=better)  : 0.942
```

R² of 0.94 means the model explains 94% of the price variation in the test
data — but remember this is trained on **synthetic** data, so report it as
"trained and evaluated on synthetic data (R²=0.94)", not as real-world
accuracy, until you swap in real researched prices.

## Real output from Step 12 (test cases) — a sample

```
--- Wood craft, normal ---
-> recommended_price: Rs.675.71 (range Rs.608.14-Rs.756.8, fair_price_status=pass, demand_tier=normal)

--- High demand -> price should rise ---
-> recommended_price: Rs.738.75 (range Rs.664.88-Rs.827.4, fair_price_status=pass, demand_tier=high)

--- Low demand -> price should fall (but never below fair floor) ---
-> recommended_price: Rs.622.37 (range Rs.575.0-Rs.697.05, fair_price_status=pass, demand_tier=low)

--- Missing required field (material_cost) ---
-> handled error (expected for invalid input): Missing required fields: ['material_cost']

--- Invalid input (text instead of number) ---
-> handled error (expected for invalid input): material_cost, labour_hours, labour_rate must be numbers...
```

Notice demand alone moved the price up and down (Rs.738 vs Rs.622) while
every invalid case failed cleanly with a message instead of crashing —
that's Steps 7, 10, and 12 all working together.

## Example API request (Postman or curl)

```bash
curl -X POST http://127.0.0.1:5000/predict-price \
  -H "Content-Type: application/json" \
  -d '{
    "category": "wood",
    "material_cost": 250,
    "labour_hours": 5,
    "labour_rate": 50,
    "complexity": 4,
    "quality": 4,
    "demand": 3,
    "uniqueness": 4
  }'
```

Real response from this exact request:

```json
{
  "recommended_price": 675.71,
  "price_range": {"min": 608.14, "recommended": 675.71, "max": 756.8},
  "fair_price_status": "pass",
  "minimum_fair_price": 575.0,
  "demand_tier": "normal",
  "ml_prediction": 692.84,
  "baseline_price": 650.0,
  "explanation": {
    "material_cost": 250.0,
    "labour_cost": 250.0,
    "complexity_adjustment": 20,
    "quality_adjustment": 15,
    "demand_adjustment": 0,
    "uniqueness_adjustment": 15,
    "recommended_price": 675.71
  }
}
```

## Before you present this to judges

1. **Replace the synthetic dataset** in `generate_data.py` with real prices
   your team researches for 3–5 craft categories, then re-run
   `train_model.py`. Report the new MAE/RMSE/R² honestly.
2. **Say "synthetic data" out loud** in your presentation wherever this
   model is mentioned — that's the correct, defensible framing, not an
   accuracy claim on real market prices.
3. The `demand` field currently drives both the ML model's training signal
   AND the Step-10 dynamic multiplier. In a full production system these
   would ideally be two separate signals (the artisan's own demand rating
   vs. live real-time market demand) — flag this as a known simplification
   if a judge asks how "dynamic" it really is.

## Next steps for the rest of Part B

Once this is solid, move to your remaining Part B work: the Image AI
endpoint, the Catalog AI endpoint, wiring them all together with Auth, and
final end-to-end testing with your teammate's Flutter app.
