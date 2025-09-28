# Smart Resume Scanning & Resume Screening System

## What this deliverable contains
- Express server with basic routes:
  - `GET /health` — health check
  - `POST /api/v1/candidates/:id/connect-consent` — records candidate consent with timestamp (creates candidate if missing)
  - `GET /api/v1/recruiters/candidates` — simple recruiter read endpoint
- MongoDB (Mongoose) Candidate model (uid, name, email, lastConsentAt, consents[])
- Logging (winston + morgan)
- Basic security middleware (helmet) and CORS
- Tests (Jest + Supertest + mongodb-memory-server)
- CI: GitHub Actions runs `npm test` on push

---

## Quick start

1. Copy files into project root (see repo layout).
2. Create `.env` from `.env.example` and set `MONGO_URI`.
3. Install deps:
    ```
    npm install
    ```
4. Start dev:
    ```
    npm run dev
    ```
5. Run tests:
    ```
    npm test
    ```
