---
id: node-profiling
type: agent
triggers: ["profiling", "perf", "regression"]
---

# Node 프로파일링 가이드

범위: CPU/Heap 프로파일 수집, 회귀 재현, 비교 분석.

기본 명령
```bash
node --cpu-prof src/index.js           # CPU 프로파일
node --heap-prof src/index.js          # Heap 프로파일
node --inspect-brk src/index.js        # DevTools 연결
```

폴더 규칙
- 프로파일 산출물: `profiles/` (git ignore 권장)
- 최소 재현: `examples/`에 별도 케이스 추가

PR 요구
- 전/후 측정값과 스크린샷(또는 .cpuprofile 링크)
- 재현 단계, 환경, 입력데이터 명시

