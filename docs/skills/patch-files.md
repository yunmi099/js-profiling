---
id: patch-files
type: skill
triggers: ["edit", "apply_patch"]
---

# Skill: Patch Files
목적: 최소 변경으로 정확히 패치하기.

규칙
- 주변 스타일/컨벤션 유지, 불필요 리팩터 금지
- 250라인 이하로 읽고 필요한 부분만 수정

절차
1) 대상 탐색: `rg "symbolOrText" src`
2) 변경 범위 합의 → 패치 생성
3) 로컬 실행/테스트로 검증 → 요약 보고

예시
```bash
rg --line-number "createServer" src
# 수정 후
apply_patch <<'PATCH'
*** Begin Patch
*** Update File: src/server.js
@@
-start()
+start({port: 3000})
*** End Patch
PATCH
```

