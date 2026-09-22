# 개인 과제 — 개인 소개 페이지 및 프론트엔드·백엔드 연동

## 프로젝트 소개
개인 소개 페이지와, 프론트엔드(React)·백엔드(FastAPI)를 연동한 메모장 API 데모입니다.
소개 페이지에서 `API Demo` 링크로 연동 화면에 접근할 수 있고, 연동 화면에서도 소개 페이지로 돌아갈 수 있습니다.

## 주요 구성
| 구분 | 내용 | 경로 | 배포 |
|---|---|---|---|
| 개인 소개 페이지 | 소개 내용을 담은 정적 HTML (국문/영문) | `frontend/public/intro.html`, `en.html` | Vercel |
| 프론트엔드 | 백엔드 API를 호출해 메모 목록을 조회·추가·삭제하는 화면 | `frontend/src/App.jsx` | Vercel |
| 백엔드 | FastAPI + SQLAlchemy로 구현한 메모 CRUD API | `backend/` | Render |

### API
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/memos` | 메모 목록 조회 |
| POST | `/memos` | 메모 추가 |
| DELETE | `/memos/{memo_id}` | 메모 삭제 |

## 배포 주소
- **GitHub 저장소**: https://github.com/chloeyschung/personal-intro-api
- **Vercel**: https://personal-intro-api.vercel.app
  - 개인 소개 페이지: https://personal-intro-api.vercel.app/intro.html
  - 프론트엔드·백엔드 연동 화면: https://personal-intro-api.vercel.app
- **백엔드 Swagger UI**: https://personal-intro-api.onrender.com/docs

> Render 무료 플랜은 일정 시간 요청이 없으면 대기 상태가 되어, 첫 접속에 30초 정도 걸릴 수 있습니다.

## 로컬 실행
### 백엔드
```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
기본 주소는 http://localhost:8000 이고, Swagger UI는 http://localhost:8000/docs 입니다.

### 프론트엔드
```
cd frontend
npm install
npm run dev
```
백엔드 주소는 `frontend/.env`의 `VITE_API_URL`로 지정합니다 (기본값 http://localhost:8000).
