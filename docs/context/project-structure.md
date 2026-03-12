---
id: project-structure
type: context
---

# 프로젝트 구조

- `src/`: 실행 코드 (`index.js|ts`, `lib/`, `utils/`)
- `examples/`: 최소 재현 예제
- `test/`: 단위/통합 테스트 (`*.test.{js,ts}`)
- `scripts/`: 개발 유틸 (빌드/프로파일 도우미)
- `profiles/`: 프로파일 산출물 (git ignore 권장)

관례
- npm 스크립트: `dev`, `build`, `test`, `lint`, `format`
- 성능 관련 변경은 항상 `examples/` 케이스 동반

