---
id: capture-profiles
type: runbook
---

# Runbook: 프로파일 수집
목표: CPU/Heap 프로파일을 일관되게 수집·보관.

CPU
```bash
node --cpu-prof --cpu-prof-dir=profiles src/index.js
```

Heap
```bash
node --heap-prof --heap-prof-dir=profiles src/index.js
```

Inspector
```bash
node --inspect=127.0.0.1:9229 src/index.js
# chrome://inspect 로 연결
```

보관
- 파일명: `profiles/<case>-<date>-<type>.cpuprofile`
- 대용량은 첨부 대신 경로/해시만 PR에 링크

