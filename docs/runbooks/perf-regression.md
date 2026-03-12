---
id: perf-regression
type: runbook
---

# Runbook: 성능 회귀 분석
목표: 회귀 재현 → 원인 식별 → 개선 검증.

단계
1) 최소 재현을 `examples/`에 작성
2) 기준 측정: `node --cpu-prof src/index.js` (산출물은 `profiles/`)
3) 변경 반영 후 동일 조건 재측정
4) 차이 분석: 핫스팟 함수/경로 비교, GC/이벤트루프 지표 확인
5) PR에 전/후 수치·그래프와 재현 절차 첨부

주의
- 측정은 콜드/웜업 분리, 3회 이상 평균
- 환경 고정: Node 버전, 플래그, 입력 데이터

