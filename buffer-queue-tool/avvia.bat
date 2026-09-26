@echo off
title Buffer Pin Queue — Luxseetarot
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js non trovato. Installalo da https://nodejs.org
  pause
  exit /b 1
)

echo Aggiorno i dati pin...
node "%~dp0generate-data.mjs"
if errorlevel 1 (
  echo Attenzione: generate-data ha segnalato un errore. Avvio comunque il server.
)

echo.
echo Chiudo eventuale server precedente sulla porta 8787...
powershell -NoProfile -Command ^
  "Get-NetTCPConnection -LocalPort 8787 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }" >nul 2>&1
timeout /t 1 /nobreak >nul

echo.
echo Avvio Buffer Pin Queue su http://127.0.0.1:8787/
echo.
echo IMPORTANTE:
echo   - Chiudere la scheda Chrome NON spegne l'app.
echo   - Per spegnere: chiudi QUESTA finestra nera.
echo   - Per riaprire solo Chrome: rilancia questo .bat.
echo.
node "%~dp0serve.mjs"
pause
