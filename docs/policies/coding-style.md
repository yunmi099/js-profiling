---
id: coding-style
type: policy
---

# 코딩 스타일

- 들여쓰기 2스페이스, 최대 100–120자
- 명명: `camelCase` 함수/변수, `PascalCase` 클래스, 파일은 `kebab-case`
- 임포트: 경로 별칭 사용 시 상대경로 난립 지양
- 도구: ESLint + Prettier (커밋 전 `npm run lint && npm run format`)

테스트
- 파일명: `*.test.{js,ts}`
- 소스 경로를 거울처럼 매칭

