"""
pricing_assistant.py
----------------------
This module holds the actual "thinking" of the Dynamic Pricing Assistant.
Both app.py (the API, STEP 11) and test_pricing.py (STEP 12) import from
here, so the logic only lives in one place.

Implements:
    STEP 4  — baseline_calculator()      rule-based starting price
    STEP 7  — fair_price_check()         protects artisan from underpricing
    STEP 8  — build_price_range()        min / recommended / max
    STEP 9  — build_explanation()        human-readable price breakdown
    STEP 10 — dynamic_demand_multiplier() reacts to current demand level

STEP 5/6 (the trained ML model) is loaded elsewhere (train_model.py builds
it, app.py loads it) and passed into get_price_recommendation() below.
"""

ADJ_PER_LEVEL = {"complexity": 20, "quality": 15, "demand": 15, "uniqueness": 15}
BASELINE_MARGIN = 1.2      # STEP 4: 20% margin over production cost before adjustments
FAIR_PRICE_MARGIN = 1.15   # STEP 7: minimum acceptable margin over production cost
ML_WEIGHT = 0.6            # how much we trust the ML model vs the rule-based baseline
BASELINE_WEIGHT = 1 - ML_WEIGHT


# ---------------------------------------------------------------------------
# Input validation — used by app.py so bad requests fail with a clear message
# instead of crashing (part of STEP 12's "don't crash on invalid input").
# ---------------------------------------------------------------------------
def validate_and_parse(data: dict) -> dict:
    if not data:
        raise ValueError("Request body is empty or not valid JSON.")

    required = ["category", "material_cost", "labour_hours"]
    missing = [f for f in required if data.get(f) in (None, "")]
    if missing:
        raise ValueError(f"Missing required fields: {missing}")

    try:
        material_cost = float(data["material_cost"])
        labour_hours = float(data["labour_hours"])
        labour_rate = float(data.get("labour_rate", 50))
        complexity = int(data.get("complexity", 3))
        quality = int(data.get("quality", 3))
        demand = int(data.get("demand", 3))
        uniqueness = int(data.get("uniqueness", 3))
        category = str(data["category"]).lower().strip()
    except (ValueError, TypeError):
        raise ValueError(
            "material_cost, labour_hours, labour_rate must be numbers; "
            "complexity, quality, demand, uniqueness must be whole numbers."
        )

    if material_cost <= 0:
        raise ValueError("material_cost must be greater than 0.")
    if labour_hours < 0:
        raise ValueError("labour_hours cannot be negative.")
    if labour_rate <= 0:
        raise ValueError("labour_rate must be greater than 0.")
    for name, val in [("complexity", complexity), ("quality", quality),
                      ("demand", demand), ("uniqueness", uniqueness)]:
        if not (1 <= val <= 5):
            raise ValueError(f"{name} must be between 1 and 5.")

    return {
        "category": category, "material_cost": material_cost,
        "labour_hours": labour_hours, "labour_rate": labour_rate,
        "complexity": complexity, "quality": quality,
        "demand": demand, "uniqueness": uniqueness,
    }


# ---------------------------------------------------------------------------
# STEP 4 — Baseline (rule-based) calculator
# ---------------------------------------------------------------------------
def baseline_calculator(p: dict) -> dict:
    labour_cost = p["labour_hours"] * p["labour_rate"]
    production_cost = p["material_cost"] + labour_cost

    complexity_adj = (p["complexity"] - 3) * ADJ_PER_LEVEL["complexity"]
    quality_adj = (p["quality"] - 3) * ADJ_PER_LEVEL["quality"]
    demand_adj = (p["demand"] - 3) * ADJ_PER_LEVEL["demand"]
    uniqueness_adj = (p["uniqueness"] - 3) * ADJ_PER_LEVEL["uniqueness"]

    baseline_price = (production_cost * BASELINE_MARGIN
                       + complexity_adj + quality_adj + demand_adj + uniqueness_adj)

    return {
        "labour_cost": round(labour_cost, 2),
        "production_cost": round(production_cost, 2),
        "complexity_adj": complexity_adj,
        "quality_adj": quality_adj,
        "demand_adj": demand_adj,
        "uniqueness_adj": uniqueness_adj,
        "baseline_price": round(baseline_price, 2),
    }


# ---------------------------------------------------------------------------
# STEP 10 — Dynamic factor: reacts to current demand level
# ---------------------------------------------------------------------------
def dynamic_demand_multiplier(demand: int):
    if demand >= 4:
        return 1.07, "high"
    if demand <= 2:
        return 0.93, "low"
    return 1.00, "normal"


# ---------------------------------------------------------------------------
# STEP 7 — Fair-price protection
# ---------------------------------------------------------------------------
def fair_price_check(candidate_price: float, production_cost: float):
    minimum_fair_price = round(production_cost * FAIR_PRICE_MARGIN, 2)
    if candidate_price < minimum_fair_price:
        return minimum_fair_price, "warning", minimum_fair_price
    return round(candidate_price, 2), "pass", minimum_fair_price


# ---------------------------------------------------------------------------
# STEP 8 — Price range
# ---------------------------------------------------------------------------
def build_price_range(recommended_price: float, floor_price: float):
    min_price = max(round(recommended_price * 0.90, 2), floor_price)
    max_price = round(recommended_price * 1.12, 2)
    return min_price, max_price


# ---------------------------------------------------------------------------
# STEP 9 — Explanation
# ---------------------------------------------------------------------------
def build_explanation(p: dict, baseline: dict, recommended_price: float):
    return {
        "material_cost": p["material_cost"],
        "labour_cost": baseline["labour_cost"],
        "complexity_adjustment": baseline["complexity_adj"],
        "quality_adjustment": baseline["quality_adj"],
        "demand_adjustment": baseline["demand_adj"],
        "uniqueness_adjustment": baseline["uniqueness_adj"],
        "recommended_price": recommended_price,
    }


# ---------------------------------------------------------------------------
# Orchestrator — combines STEP 4,5/6,7,8,9,10 into one recommendation
# ---------------------------------------------------------------------------
def get_price_recommendation(raw_input: dict, model) -> dict:
    p = validate_and_parse(raw_input)

    # STEP 4
    baseline = baseline_calculator(p)

    # STEP 5/6 — ask the trained ML model for its own prediction
    import pandas as pd
    row = pd.DataFrame([{
        "category": p["category"],
        "material_cost": p["material_cost"],
        "labour_hours": p["labour_hours"],
        "labour_rate": p["labour_rate"],
        "complexity": p["complexity"],
        "quality": p["quality"],
        "demand": p["demand"],
        "uniqueness": p["uniqueness"],
    }])
    ml_prediction = float(model.predict(row)[0])

    # Blend ML prediction with the rule-based baseline so one bad/overfit
    # model output can't produce a wild price on its own.
    blended_price = ML_WEIGHT * ml_prediction + BASELINE_WEIGHT * baseline["baseline_price"]

    # STEP 10
    multiplier, demand_tier = dynamic_demand_multiplier(p["demand"])
    dynamic_price = blended_price * multiplier

    # STEP 7
    recommended_price, fair_status, minimum_fair_price = fair_price_check(
        dynamic_price, baseline["production_cost"]
    )

    # STEP 8
    min_price, max_price = build_price_range(recommended_price, minimum_fair_price)

    # STEP 9
    explanation = build_explanation(p, baseline, recommended_price)

    return {
        "inputs": p,
        "ml_prediction": round(ml_prediction, 2),
        "baseline_price": baseline["baseline_price"],
        "demand_tier": demand_tier,
        "dynamic_price_before_fair_check": round(dynamic_price, 2),
        "minimum_fair_price": minimum_fair_price,
        "fair_price_status": fair_status,
        "recommended_price": recommended_price,
        "price_range": {"min": min_price, "recommended": recommended_price, "max": max_price},
        "explanation": explanation,
    }
