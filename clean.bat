@echo off
chcp 65001 > nul

echo ⚡ Starting cleanup and installation process...

echo 🔄 Stopping services...
docker-compose down -v

echo 🧹 Cleaning system...
docker system prune -af --volumes

echo 🧹 Cleaning directories...
if exist "client\node_modules" rmdir /s /q "client\node_modules"
if exist "server\node_modules" rmdir /s /q "server\node_modules"
if exist "client\build" rmdir /s /q "client\build"
if exist "server\dist" rmdir /s /q "server\dist"
if exist "client\package-lock.json" del /f /q "client\package-lock.json"
if exist "server\package-lock.json" del /f /q "server\package-lock.json"

echo 📦 Installing dependencies...
cd server
call npm install
cd ../client
call npm install --legacy-peer-deps --force
cd ..

echo 🚀 Starting the system...
docker-compose up --build

pause