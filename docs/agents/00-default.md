---
id: default-agent
type: agent
priority: highest
triggers: ["start", "help", "context"]
---

# 기본 에이전트 지침

목표: 안전하고 반복가능한 변경으로 성능 프로파일링 작업을 지원한다.

읽기 순서
1) `docs/context/project-structure.md`
2) `docs/policies/coding-style.md`
3) 필요한 스킬/런북 문서

작업 전 체크
- 범위와 산출물(코드/문서/프로파일) 명확화
- 실행/테스트 가능한 최소 재현 준비

도구 원칙
- 코드 검색: `rg`
- 패치: apply_patch 한 번에 작은 묶음
- 출력은 간결하게, 근거는 링크(상대경로)로

보고 형식
- 요약(1–3줄) → 변경 포인트 → 검증 방법 → 다음 단계

