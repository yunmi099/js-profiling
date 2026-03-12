---
id: monitoring-quickstart-ko
type: guide
---

# 모니터링 빠른 시작

구성: 호스트에서 앱 실행, 컨테이너로 Prometheus/Grafana.

1) 앱 실행(호스트)
```
npm run build && npm start
# 확인: http://localhost:3000/metrics
```

2) 모니터링 기동(컨테이너)
```
cd infra && docker compose up -d --build
# Prometheus: http://localhost:9090 (Targets: host.docker.internal:3000 → UP)
# Grafana:    http://localhost:3001 (폴더: Node App → Node App Overview)
```

3) 부하 주기(k6)
```
k6 run load/k6/basic.js
# 또는 Docker
docker run --rm -i --network host -e BASE_URL=http://127.0.0.1:3000 grafana/k6 run - < load/k6/basic.js
```

메모
- Prometheus 타깃: host.docker.internal:3000 (macOS/Windows 기준)
- Linux의 경우 compose에 `extra_hosts: ["host.docker.internal:host-gateway"]` 추가 필요

