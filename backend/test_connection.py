from database import engine

try:
    with engine.connect() as conn:
        print("✅ Connected to Supabase successfully!")
except Exception as e:
    print("❌ Connection failed:", e)