"""
test_pricing.py
------------------
STEP 12 — Test the Dynamic Pricing Assistant directly (no server needed).

Covers normal products across categories, plus edge cases:
extreme costs, extreme labour hours, high/low demand, missing input,
invalid input. Confirms the assistant never crashes and always returns
either a sensible price or a clear error message.

Run:
    python test_pricing.py
"""

import joblib
from pricing_assistant import get_price_recommendation

model = joblib.load("model/pricing_model.pkl")


def run_case(label, payload):
    print(f"\n--- {label} ---")
    print(f"input: {payload}")
    try:
        result = get_price_recommendation(payload, model)
        print(f"-> recommended_price: Rs.{result['recommended_price']}  "
              f"(range Rs.{result['price_range']['min']}-Rs.{result['price_range']['max']}, "
              f"fair_price_status={result['fair_price_status']}, demand_tier={result['demand_tier']})")
    except ValueError as e:
        print(f"-> handled error (expected for invalid input): {e}")
    except Exception as e:
        print(f"-> UNEXPECTED CRASH: {e}")


# ----- normal products across categories -----
run_case("Wood craft, normal", {
    "category": "wood", "material_cost": 250, "labour_hours": 5, "labour_rate": 50,
    "complexity": 4, "quality": 4, "demand": 3, "uniqueness": 4})

run_case("Pottery, normal", {
    "category": "pottery", "material_cost": 150, "labour_hours": 3, "labour_rate": 50,
    "complexity": 3, "quality": 4, "demand": 3, "uniqueness": 3})

run_case("Textile, normal", {
    "category": "textile", "material_cost": 300, "labour_hours": 6, "labour_rate": 50,
    "complexity": 4, "quality": 5, "demand": 4, "uniqueness": 5})

run_case("Jewelry, normal", {
    "category": "jewelry", "material_cost": 400, "labour_hours": 8, "labour_rate": 50,
    "complexity": 5, "quality": 5, "demand": 3, "uniqueness": 5})

run_case("Basket, normal", {
    "category": "basket", "material_cost": 120, "labour_hours": 4, "labour_rate": 50,
    "complexity": 2, "quality": 3, "demand": 3, "uniqueness": 3})

# ----- edge cases -----
run_case("Very high material cost", {
    "category": "wood", "material_cost": 5000, "labour_hours": 5, "labour_rate": 50,
    "complexity": 3, "quality": 3, "demand": 3, "uniqueness": 3})

run_case("Very low material cost", {
    "category": "wood", "material_cost": 5, "labour_hours": 1, "labour_rate": 50,
    "complexity": 1, "quality": 1, "demand": 1, "uniqueness": 1})

run_case("Very high labour hours", {
    "category": "textile", "material_cost": 200, "labour_hours": 120, "labour_rate": 50,
    "complexity": 3, "quality": 3, "demand": 3, "uniqueness": 3})

run_case("High demand -> price should rise", {
    "category": "wood", "material_cost": 250, "labour_hours": 5, "labour_rate": 50,
    "complexity": 4, "quality": 4, "demand": 5, "uniqueness": 4})

run_case("Low demand -> price should fall (but never below fair floor)", {
    "category": "wood", "material_cost": 250, "labour_hours": 5, "labour_rate": 50,
    "complexity": 4, "quality": 4, "demand": 1, "uniqueness": 4})

run_case("Missing required field (material_cost)", {
    "category": "wood", "labour_hours": 5, "labour_rate": 50,
    "complexity": 4, "quality": 4, "demand": 3, "uniqueness": 4})

run_case("Invalid input (text instead of number)", {
    "category": "wood", "material_cost": "expensive", "labour_hours": 5, "labour_rate": 50,
    "complexity": 4, "quality": 4, "demand": 3, "uniqueness": 4})

run_case("Out-of-range factor (complexity=9)", {
    "category": "wood", "material_cost": 250, "labour_hours": 5, "labour_rate": 50,
    "complexity": 9, "quality": 4, "demand": 3, "uniqueness": 4})

print("\nAll cases run. Check above: normal cases should show sensible prices,")
print("edge cases should either show a reasonable protected price or a clear error — never a crash.")
