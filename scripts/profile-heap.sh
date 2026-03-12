#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
cd "$ROOT_DIR"

TS=$(date +%Y%m%d-%H%M%S)
OUT="profiles/app-${TS}.heapprofile"

echo "[profile] building..."
npm run -s build

echo "[profile] starting app with --heap-prof (output: $OUT)"
node \
  --heap-prof \
  --heap-prof-dir=profiles \
  --heap-prof-name="$(basename "$OUT")" \
  dist/main.js &
APP_PID=$!

cleanup() {
  if ps -p "$APP_PID" >/dev/null 2>&1; then
    echo "[profile] stopping app (pid=$APP_PID) to flush heap profile..."
    kill -INT "$APP_PID" || true
    wait "$APP_PID" || true
  fi;
}
trap cleanup EXIT INT TERM

echo "[profile] waiting for app to be ready on :3000 ..."
for i in {1..60}; do
  if curl -sf http://127.0.0.1:3000/metrics >/dev/null; then
    break
  fi
  sleep 1
done

echo "[profile] running k6 basic scenario"
npm run -s k6:basic || true

echo "[profile] done; heap profile saved to $OUT"

