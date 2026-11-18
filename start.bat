@echo off
title BrandGuard AI - Enterprise Governance Platform
cd /d "%~dp0"
set PATH=%USERPROFILE%\.gemini\antigravity\bin;%PATH%

echo ========================================================
echo   Starting BrandGuard AI - Enterprise Governance Platform
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting local server on http://localhost:3000 ...
    start http://localhost:3000
    node server.js
) else (
    echo Node.js not detected in system PATH.
    echo Opening self-contained BrandGuard AI application directly in your browser...
    start "" "index.html"
)

pause
