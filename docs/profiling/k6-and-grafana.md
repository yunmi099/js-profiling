---
id: k6-grafana
type: guide
---

# 부하(k6) + Grafana/Prometheus

## 폴더 구조
- `load/k6/basic.js`: k6 스크립트 (기본: `/work`)
- `infra/docker-compose.yml`: app + prometheus + grafana
- `infra/prometheus/prometheus.yml`: 스크레이프 설정(`/metrics`)
- `infra/grafana/…`: 데이터소스/대시보드 프로비저닝(JSON)

## 실행 절차
1) 앱 로컬 실행
```
npm run build && npm start
# 또는 compose로 함께 실행: (Docker Desktop 필요)
cd infra && docker compose up -d --build
```
2) 부하 실행(k6)
```
# 로컬 설치 시
k6 run load/k6/basic.js
# Docker로 실행 시
docker run --rm -i --network host -e BASE_URL=http://127.0.0.1:3000 grafana/k6 run - < load/k6/basic.js
```
3) 메트릭 확인
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (익명 뷰)
- 대시보드: Node App / "Node App Overview"

## 메트릭 기준
- 요청 속도: `sum(rate(http_request_duration_seconds_count[1m]))`
- 지연 p95: `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[1m])) by (le))`
- CPU/메모리: `rate(process_cpu_*_seconds_total[1m])`, `process_resident_memory_bytes`
- 이벤트루프: `nodejs_eventloop_lag_seconds`

## 주의
- 라벨 카디널리티 관리: `route` 라벨은 정규화된 경로만 사용
- Docker on Mac: k6 네트워크는 `--network host` 대체로 `host.docker.internal` 사용 가능

