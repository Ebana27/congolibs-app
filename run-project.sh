#!/usr/bin/env bash
set -e
echo "Quick starter for CongoLibs (macOS / Linux)"

if [ ! -d node_modules ]; then
  echo "Installing npm dependencies..."
  npm install
fi

echo "Starting dev server (Vite)"
npm run dev &

echo "Opening http://localhost:5173"
sleep 1
if command -v xdg-open >/dev/null; then
  xdg-open http://localhost:5173 || true
elif command -v open >/dev/null; then
  open http://localhost:5173 || true
fi

wait
