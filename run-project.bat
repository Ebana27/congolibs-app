@echo off
REM Quick starter for Windows (PowerShell-friendly)
echo Running setup for CongoLibs (Windows)

REM Install deps if node_modules missing
IF NOT EXIST node_modules (
  echo Installing npm dependencies...
  npm install
)

echo Starting dev server (Vite)...
start "" cmd /c "npm run dev"

echo Opening browser to http://localhost:5173
start http://localhost:5173

echo Done.
pause
