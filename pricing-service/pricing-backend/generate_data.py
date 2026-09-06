"""
generate_data.py
-----------------
STEP 2 — Input features for the Dynamic Pricing Assistant:
    category, material_cost, labour_hours, labour_rate,
    complexity, quality, demand, uniqueness

STEP 3 — Build the pricing dataset.

IMPORTANT (documented, as required by the spec):
This dataset is SYNTHETIC, not real market data. There is no public dataset
of real handmade-craft selling prices, so we generate believable examples
using a transparent formula (see the comments below), then add random noise
so the ML model has to genuinely learn a pattern rather than memorize a
straight formula. Before using this for a real product, your team should
replace these rows with real prices researched from your craft categories.

Run this once to create data/pricing_data.csv, then run train_model.py.
"""

import random
import csv

random.seed(42)

CATEGORIES = ["wood", "pottery", "textile", "jewelry", "basket"]

# How much profit margin the market typically supports per category,
# on top of raw production cost. Replace with real researched numbers later.
CATEGORY_MARGIN = {
    "wood": 1.5,
    "pottery": 1.4,
    "textile": 1.8,
    "jewelry": 2.2,
    "basket": 1.5,
}

# Rupee value of moving one level (1-5) on each quality-style factor.
ADJ_PER_LEVEL = {"complexity": 20, "quality": 15, "demand": 15, "uniqueness": 15}

rows = []
for _ in range(400):
    category = random.choice(CATEGORIES)
    material_cost = round(random.uniform(50, 600), 2)
    labour_hours = round(random.uniform(1, 30), 1)
    labour_rate = 50  # Rs. per hour — same reference wage used across categories

    complexity = random.randint(1, 5)
    quality = random.randint(1, 5)
    demand = random.randint(1, 5)
    uniqueness = random.randint(1, 5)

    labour_cost = labour_hours * labour_rate
    production_cost = material_cost + labour_cost

    adjustment = (
        (complexity - 3) * ADJ_PER_LEVEL["complexity"]
        + (quality - 3) * ADJ_PER_LEVEL["quality"]
        + (demand - 3) * ADJ_PER_LEVEL["demand"]
        + (uniqueness - 3) * ADJ_PER_LEVEL["uniqueness"]
    )

    base_price = production_cost * CATEGORY_MARGIN[category] + adjustment

    # add +/-8% random noise so the ML model has real signal to learn,
    # not just a formula it can reverse perfectly
    selling_price = round(base_price * random.uniform(0.92, 1.08), 2)
    selling_price = max(selling_price, production_cost)  # never below raw cost in training data

    rows.append({
        "category": category,
        "material_cost": material_cost,
        "labour_hours": labour_hours,
        "labour_rate": labour_rate,
        "complexity": complexity,
        "quality": quality,
        "demand": demand,
        "uniqueness": uniqueness,
        "selling_price": selling_price,
    })

with open("data/pricing_data.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)

print(f"Wrote {len(rows)} synthetic rows to data/pricing_data.csv")
print("Reminder: this is SYNTHETIC data — replace with real researched prices before relying on it.")
