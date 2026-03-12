---
id: offline-viewing
type: guide
---

# 오프라인 플레임그래프 보기

외부 업로드 없이 로컬에서만 분석합니다.

- Speedscope CLI(로컬 실행)
  - 가장 최근 CPU 프로파일 열기: `npm run speedscope:latest`
  - 동작: 로컬 `node_modules/.bin/speedscope`로 브라우저를 열며, 파일은 로컬에서만 읽습니다.

- 0x(HTML 플레임그래프)
  - 실행: `npm run flame:0x` → 별도 터미널에서 `npm run k6:basic`으로 트래픽 → Ctrl+C로 종료
  - 산출: `profiles/<0x-*>/flamegraph.html` (단일 HTML, 내부 공유 용이)

- Chrome DevTools(로컬 파일)
  - 실행: DevTools → Performance → Load profile → `profiles/*.cpuprofile`
  - 메모리: Memory 탭 → Load → `*.heapprofile|*.heapsnapshot`

- 보안 메모
  - `speedscope.app`는 클라이언트 사이드에서만 파일을 열지만, 정책상 외부 URL 사용이 꺼려진다면 위 CLI/DevTools를 사용하세요.
  - 산출물은 `profiles/`에 저장되고 `.gitignore` 처리되어 원격 저장소로 올라가지 않습니다.
