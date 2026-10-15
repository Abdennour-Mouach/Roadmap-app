@echo off
echo ========================================
echo    Roadmap App - Quick Start Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if MongoDB is running
echo Checking MongoDB connection...
mongosh --eval "db.version()" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MongoDB is not running!
    echo Starting MongoDB service...
    net start MongoDB >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to start MongoDB!
        echo Please start MongoDB manually or install it from https://www.mongodb.com/
        pause
        exit /b 1
    )
)

echo [OK] MongoDB is running
echo.

REM Check if dependencies are installed
if not exist "server\node_modules" (
    echo Installing server dependencies...
    cd server
    call npm install
    cd ..
)

if not exist "client\node_modules" (
    echo Installing client dependencies...
    cd client
    call npm install
    cd ..
)

echo.
echo ========================================
echo    Starting Roadmap App
echo ========================================
echo.
echo Backend will start on: http://localhost:5000
echo Frontend will start on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start backend in a new window
start "Roadmap App - Backend" cmd /k "cd server && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in a new window
start "Roadmap App - Frontend" cmd /k "cd client && npm start"

echo.
echo ========================================
echo    Servers Started Successfully!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Check the new windows for server logs
echo.
pause
