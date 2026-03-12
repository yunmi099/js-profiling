---
id: profiling-stack
type: guide
---

# 프로파일링 스택 & 워크플로우

목표: Nest(Node 20) 서비스의 CPU/메모리/비동기 흐름을 재현 가능하게 수집·시각화.

## 도구 선택
- V8 내장: `--cpu-prof`, `--heap-prof` (기본, 의존성 無)
- 시각화: Speedscope(웹/CLI) 또는 Chrome DevTools
- 시나리오 분석: Clinic.js(`clinic flame`, `clinic bubbleprof`, `clinic doctor`)
- 부하 생성: `k6` (스크립트형 부하, CI 연동 용이)
- 지속적 수집(선택): Grafana Pyroscope + Node SDK(@pyroscope/nodejs)

## 로컬 임시 수집(권장 기본)
- CPU 프로파일: `npm run build && node --cpu-prof --cpu-prof-dir=profiles dist/main.js`
- 힙 프로파일: `npm run build && node --heap-prof --heap-prof-dir=profiles dist/main.js`
- 부하: `k6 run load/k6/basic.js` (또는 Docker k6)
- 보기: `https://www.speedscope.app/` 열고 `profiles/*.cpuprofile` 로드

## Clinic.js(선택)
- Flame: `npx clinic flame -- node dist/main.js`
- Bubbleprof(비동기 흐름): `npx clinic bubbleprof -- node dist/main.js`
- Doctor(병목 탐색): `npx clinic doctor -- node dist/main.js`
- 산출물은 `clinic-*` 폴더(HTML 리포트)

## 지속적 프로파일링(선택: Grafana Pyroscope)
1) 서버/클라우드 Pyroscope 준비(수집 URL/토큰)
2) 앱에 SDK 추가(@pyroscope/nodejs)
3) 설정 예시(.env):
```
PYROSCOPE_SERVER=http://localhost:4040
PYROSCOPE_AUTH_TOKEN=
PYROSCOPE_APP_NAME=node-js-profiling
```
4) 코드 스니펫(참고):
```ts
// src/main.ts 상단
// import { start } from '@pyroscope/nodejs';
// start({ serverAddress: process.env.PYROSCOPE_SERVER!, appName: process.env.PYROSCOPE_APP_NAME!, authToken: process.env.PYROSCOPE_AUTH_TOKEN });
```

## 아티팩트 & 확인 포인트
- 아티팩트: `profiles/*.cpuprofile`, `*.heapsnapshot|*.heapprofile`, `clinic-*` 리포트
- 확인: 핫 함수/콜스택 폭, 이벤트루프 지연, GC 빈도·시간, Outliers(버스트), 비동기 체인의 병목
- PR에는 전/후 그래프 또는 요약치(Top N 프레임, 총/평균 응답) 첨부

## 대시보드/모니터링(옵션)
- Prometheus + Grafana: `infra/docker-compose.yml`로 기동
- 기본 대시보드: `infra/grafana/dashboards/node-app.json` (자동 로드)
