#!/bin/bash

echo "🧹 מתחיל תהליך ניקוי והתקנה..."

# עצירת כל השירותים
echo "⏹️ עוצר שירותים..."
docker-compose down

# ניקוי דוקר
echo "🗑️ מנקה מערכת..."
docker system prune -af --volumes

# מחיקת תיקיות build
echo "🧹 מנקה תיקיות build..."
rm -rf ./server/dist
rm -rf ./client/build

# התקנת dependencies
echo "📦 מתקין dependencies..."
cd server && npm install
cd ../client && npm install
cd ..

# הרצת המערכת
echo "🚀 מעלה את המערכת..."
docker-compose up --build
