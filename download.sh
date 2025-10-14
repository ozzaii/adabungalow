#!/usr/bin/env bash
set -euo pipefail

mkdir -p uzungol_ada_bungalow/{havuzlu_luks_villa,selaleli_villa,luxury_3_1}

# === Havuzlu Lüks Villa (5 görsel) ===
wget -nc -P uzungol_ada_bungalow/havuzlu_luks_villa \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/ad252492_z.jpg" \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/c28904ce_z.jpg" \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/9cc88e73_z.jpg" \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/d0afc65c_z.jpg" \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/27b412b3_z.jpg"

# === Şelaleli Villa (5 görsel) ===
wget -nc -P uzungol_ada_bungalow/selaleli_villa \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/eca59a26_z.jpg" \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/27a3bae6_z.jpg" \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/30506e64_z.jpg" \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/20190064_z.jpg" \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/76c25e68_z.jpg"

# === Luxury 3+1 (5 görsel) ===
wget -nc -P uzungol_ada_bungalow/luxury_3_1 \
  "https://cdn.halalstatic.com/expedia/19000000/18830000/18822500/18822461/8875c9d5_z.jpg" \
  "https://imgservice.foodtravelturk.com/680x408/ada-bungalow-hotel-tr-%C3%A7aykara-ep-18822461-0.jpg" \
  "https://imgservice.foodtravelturk.com/500x325/ada-bungalow-hotel-tr-%C3%A7aykara-ep-18822461-1.jpg" \
  "https://imgservice.foodtravelturk.com/500x325/ada-bungalow-hotel-tr-%C3%A7aykara-ep-18822461-2.jpg" \
  "https://imgservice.foodtravelturk.com/500x325/ada-bungalow-hotel-tr-%C3%A7aykara-ep-18822461-3.jpg"

echo "✓ Bitti. Klasör: uzungol_ada_bungalow/"