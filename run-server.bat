@echo off
cd /d "%~dp0"
set PATH=%USERPROFILE%\.gemini\antigravity\bin;%PATH%
echo [%date% %time%] Starting BrandGuard server... >> server.log
:loop
node server.js >> server.log 2>&1
echo [%date% %time%] Server stopped with code %errorlevel%, restarting in 2 seconds... >> server.log
timeout /t 2 /nobreak >nul
goto loop
