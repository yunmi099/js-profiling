# 모니터링 + k6 빠른 시작

이 저장소는 호스트(로컬)에서 Nest 앱을 실행하고, Prometheus/Grafana는 컨테이너로 띄워 손쉽게 모니터링합니다. k6로 간단히 부하를 줄 수 있습니다.

## 준비물
- Node.js 20 (프로젝트에 `.nvmrc` 제공)
- Docker Desktop (Docker Compose 포함)

## 1) 앱 실행(호스트)
```bash
npm run build && npm start
# 확인: http://localhost:3000/metrics (Prometheus 텍스트 지표)
```

## 2) 모니터링 기동(컨테이너)
```bash
cd infra
docker compose up -d --build
# Prometheus: http://localhost:9090 (Status > Targets 에서 host.docker.internal:3000 이 UP 인지 확인)
# Grafana:    http://localhost:3001 (폴더: Node App > Node App Overview)
```
- Prometheus는 `host.docker.internal:3000/metrics`를 스크레이프합니다.
- Grafana는 기본 데이터소스/대시보드를 자동 프로비저닝합니다.

## 3) k6로 부하 주기
- Docker로 실행(권장):
```bash
npm run k6:basic
# 또는 단계 부하: 
# docker run --rm -i --network host -e BASE_URL=http://127.0.0.1:3000 grafana/k6 run - < load/k6/stages.js
```
- 로컬 설치로 실행:
```bash
npm run k6:basic:local
```

## 참고
- Linux에서 `host.docker.internal` 미동작 시, `infra/prometheus/prometheus.yml` 대신 compose 서비스에
  `extra_hosts: ["host.docker.internal:host-gateway"]`를 추가하세요.
- 자세한 가이드는 `docs/profiling/quickstart-ko.md`, `docs/profiling/k6-setup.md`를 참고하세요.

