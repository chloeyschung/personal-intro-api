# personal-intro-api

클라우드컴퓨팅 실습 **개인과제** 제출용 독립 저장소. 마감 **2026-09-22 23:59**.
(2026-09-16 홈 디렉터리에서 진행한 세션 `6b1b27f0-2d0b-4810-8994-da4de159b645`의 작업을 이어받음)

## 과제 요건 (PDF 기준)
- 개인 소개 페이지 (HTML) → Vercel
- 프론트엔드: 백엔드 API 호출 + 결과 표시 → Vercel
- 백엔드: FastAPI API → Render
- GitHub 저장소 + README.md (프로젝트 소개 / 주요 구성 / 배포 주소)
- 제출물 3개: GitHub 주소, Vercel 주소, Render Swagger UI(`/docs`) 주소

## 저장소 분리 원칙
- 이 레포 = **제출용**. 주차별 실습 잔재를 섞지 않는다.
- `~/Desktop/claude code/cloud_computing_practicum` = 주차별 실습 샌드박스 (W2 memo). 앞으로 실습은 워크북 방식대로 레포를 따로 판다 (expense-api 등).
- 코드는 실습 워크북(W1 my-page 구조, W2 FastAPI+SQLite 4~5장)의 뼈대를 따른다. 임의로 다른 스택/구조를 쓰지 않는다.

## 현재 상태
- `backend/` FastAPI + SQLite 메모장 CRUD (`/memos` GET/POST/DELETE). 로컬 스모크 테스트 통과.
  CORS 허용 출처는 환경변수 `ALLOWED_ORIGINS`.
- `frontend/` React(Vite) 메모장 화면, `VITE_API_URL`로 백엔드 호출. 빌드 성공 확인.
- `frontend/public/intro.html` — **아직 TODO 스켈레톤**. 여기가 남은 핵심 작업.
- `README.md` — 배포 주소 3곳이 TODO.
- 미완료: Vercel 배포(Root Directory `frontend`), Render 배포(Root Directory `backend`,
  Start `uvicorn main:app --host 0.0.0.0 --port $PORT`), 배포 후 `VITE_API_URL`·`ALLOWED_ORIGINS` 연결.

## 개인 소개 페이지 방향
기준 문서: [docs/brief.md](docs/brief.md) — **작업 전에 반드시 읽을 것.**
핵심 원칙은 "Don't explain me. Let people infer me." 자기소개/이력서/포트폴리오 템플릿처럼 보이면 안 되고,
선택한 것들(영화·작곡가·도시·향)의 아카이브/색인처럼 보여야 한다.

컨셉 3안과 프로토타입: [docs/concepts/](docs/concepts/) — `proposal.md`와 HTML 3개.
공개된 아티팩트:
- 01 Index 2026 — https://claude.ai/artifact/Efi5m5X8jP3MGuWqzp1ojq
- 02 Subtitle Reel — https://claude.ai/artifact/K4H16bhFKjkbeRa3aHV1A7
- 03 Plan 1:100 — https://claude.ai/artifact/SC2KkoqwgjEHHtoU1PPQDW

**정해진 방향**: 01 INDEX를 뼈대로, 페이지마다 다른 인터랙션(02·03의 요소를 흡수).
`intro.html`(INDEX) / `films.html` / `places.html` / `music.html` / `scent.html` / `work.html`,
그리고 과제 요건인 메모장 데모(`index.html`)를 색인 속 한 항목 "LAB"으로 편입.
묶는 장치 3개 고정: 같은 타입 시스템(Newsreader + IBM Plex Mono), 좌상단 `← INDEX`, 우상단 항목 번호.
우선순위: INDEX + FILMS + LAB 만으로 과제 요건 충족 → 나머지는 시간 되는 대로.

## 인덱스 구조 (2026-09-19 해결)
이전 프로토타입은 위의 카테고리 필터바와 아래의 알파벳 단일 리스트가 서로 대응하지 않는 게 문제였다.
**섹션을 뼈대로 통일**해서 해결: 상단 CONTENTS 내비 = 아래 섹션 = 앞으로 만들 페이지, 셋이 일치한다.
- 페이지 전체가 `[번호] [제목] [메타데이터]` 격자 하나를 공유한다 (`--ref` 열 폭). 콜로폰·내비·섹션 헤드·항목이
  모두 같은 세로선 위에 놓인다. 이 격자를 깨지 않는 선에서 수정할 것.
- 번호는 섹션 안에서 01부터 다시 시작한다(진짜 색인 번호). 메타데이터 열은 섹션별로 종류가 하나다
  (영화=연도·러닝타임, 음악=작품명, 장소=좌표, 향=브랜드·무드).
- 항목 정렬은 알파벳이 아니라 **브리프에 적힌 본인의 순서**를 따른다.
- 병치감은 see-also가 담당한다: 항목을 누르면 섹션을 가로질러 연결된 것만 남는다.

## 남은 일
1. **hover 메모 36개는 전부 Claude가 지어낸 임시 문장**이다 (`intro.html`의 `.note`).
   본인 문장으로 교체해야 한다 — 사이트의 핵심이 본인의 시선이므로 여기가 가장 중요하다.
2. 카테고리별 페이지(`films.html` 등)는 아직 없다. 섹션 헤드에서 링크를 걸 자리는 비워뒀다.
3. Vercel / Render 배포와 README 주소 3개.
