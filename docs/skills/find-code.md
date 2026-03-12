---
id: find-code
type: skill
triggers: ["search", "trace"]
---

# Skill: 코드 찾기
목적: 관심 영역을 빠르게 식별하고 영향 범위를 추적.

패턴
- 심볼: `rg "^export function foo" -n src`
- 사용처: `rg "foo\(" src`
- 파일만: `rg --files src | rg server`
- 테스트 짝: 소스 경로를 기준으로 `*.test.ts` 검색

팁
- 결과가 많으면 `-g '!**/dist/**'`로 제외
- 경로 지도를 `docs/context/project-structure.md`와 함께 갱신

