#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")"/.. && pwd)"
cd "$ROOT_DIR"

echo "[0x] build..."
npm run -s build

echo "[0x] 실행 중에 별도 터미널에서 k6를 돌려 트래픽을 주세요. 종료(Ctrl+C)하면 플레임그래프가 생성됩니다."
echo "예: npm run k6:basic  (또는 docker k6 stages.js)"

npx 0x --output-dir=profiles --silent dist/main.js || true

OUT_DIR=$(ls -td profiles/*/ 2>/dev/null | head -n1 || true)
if [ -n "$OUT_DIR" ] && [ -f "${OUT_DIR%/}/flamegraph.html" ]; then
  echo "[0x] 생성됨: ${OUT_DIR%/}/flamegraph.html"
else
  echo "[0x] 결과 디렉터리를 찾지 못했습니다. profiles/ 아래를 확인하세요."
fi

