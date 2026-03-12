# 모니터링 · 부하(k6) · 프로파일링 빠른 시작

호스트에서 Nest 앱을 실행하고, 모니터링은 컨테이너(Prometheus/Grafana)로 띄웁니다. k6로 간단히 부하를 주고, Speedscope/DevTools로 플레임그래프를 로컬에서 확인합니다.

## 준비물
- Node.js 20 (`.nvmrc` 제공)
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
# Prometheus: http://localhost:9090  (Status > Targets: host.docker.internal:3000 → UP)
# Grafana:    http://localhost:3001  (Node App > Node App Overview)
```
- Prometheus는 `host.docker.internal:3000/metrics`를 스크레이프(맥/윈도우).
- Grafana는 데이터소스/대시보드를 자동 프로비저닝합니다.

## 3) k6로 부하 주기
- Docker(권장): `npm run k6:basic`
- 단계 부하 예시:
```bash
docker run --rm -i --network host -e BASE_URL=http://127.0.0.1:3000 grafana/k6 run - < load/k6/stages.js
```
- 로컬 설치로 실행: `npm run k6:basic:local`

## 4) 프로파일링(로컬 파일 저장)
- CPU + k6 자동수집: `npm run profile:cpu:k6`
- 힙 + k6 자동수집: `npm run profile:heap:k6`
- 수동 실행만: `npm run profile:cpu:serve` / `npm run profile:heap:serve`
- 산출물: `profiles/*.cpuprofile`, `profiles/*.heapprofile` (git ignore 처리)

## 5) 플레임그래프 보기(오프라인)
- Speedscope CLI(로컬): `npm run speedscope:latest` (가장 최근 .cpuprofile 열기)
- Chrome DevTools: Performance → Load profile(.cpuprofile), Memory → Load(.heapprofile)
- 0x HTML: `npm run flame:0x` 실행 후 별도 터미널에서 `npm run k6:basic` → 종료 시 `profiles/…/flamegraph.html`

## 참고/문서
- Linux에서 `host.docker.internal` 미동작 시 compose에 `extra_hosts: ["host.docker.internal:host-gateway"]` 추가
- 모니터링: `docs/profiling/quickstart-ko.md`, k6: `docs/profiling/k6-setup.md`
- 오프라인 보기: `docs/profiling/offline-viewing.md`
