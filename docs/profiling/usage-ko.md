---
id: profiling-usage-ko
type: guide
---

# 프로파일링 사용법(로컬)

CPU 프로파일
- 서버만 실행: `npm run profile:cpu:serve`
- k6와 함께 자동 수집: `npm run profile:cpu:k6`
  - 서버를 백그라운드로 실행 → k6 부하 → 정상 종료(SIGINT)로 `.cpuprofile` 저장

힙 프로파일
- 서버만 실행: `npm run profile:heap:serve`
- k6와 함께 자동 수집: `npm run profile:heap:k6`

결과 확인
- Speedscope(CLI): `npm run speedscope:latest` (가장 최근 `.cpuprofile` 열기)
- 웹: https://www.speedscope.app/ 에서 `profiles/*.cpuprofile` 드롭

주의
- `.cpuprofile`/`.heapprofile`는 `profiles/`에 저장됩니다(`.gitignore` 처리됨).
- 정확한 비교를 위해 동일 시나리오/시간/환경에서 전/후 측정하세요.

