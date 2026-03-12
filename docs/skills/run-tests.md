---
id: run-tests
type: skill
triggers: ["test", "ci"]
---

# Skill: 테스트 실행
목적: 변경 검증과 회귀 방지.

명령
```bash
npm test            # 단발 실행 (CI와 동일)
npm run test:watch  # 변경 감지
npm run coverage    # 커버리지 리포트 (있을 경우)
```

원칙
- 느린 I/O는 목 처리, 타이머는 가짜 타이머 사용
- 변경한 코드 라인 기준 커버리지 ≥ 80% 목표

