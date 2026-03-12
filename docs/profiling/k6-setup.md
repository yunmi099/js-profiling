---
id: k6-setup
type: guide
---

# k6 세팅 가이드

설치(택1)
- Docker: 별도 설치 불필요, 이미지 사용 권장
- 로컬 설치: macOS `brew install k6`

실행 스크립트
- Docker: `npm run k6:basic`
- 로컬: `npm run k6:basic:local`

시나리오 파일
- `load/k6/basic.js`: 고정 VU
- `load/k6/stages.js`: 단계 부하(랩업/홀드/다운)

환경 변수
- `BASE_URL` 기본값 `http://127.0.0.1:3000`
- Docker 실행 시 `-e BASE_URL=...`로 변경 가능

팁
- Grafana 대시보드와 함께 열고 p95, 에러율을 함께 확인
- k6 결과 요약과 Grafana 스크린샷을 PR에 첨부

