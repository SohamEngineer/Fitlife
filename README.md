# Fitlife

## AI deployment notes

Recommended hosting split:

- Client: Netlify, using `netlify.toml` from the repo root.
- Server: Render, using `render.yaml` from the repo root.
- Database: MongoDB Atlas, exposed to Render as `MONGO_URI`.

Live deployment links:

- Frontend: https://fitlife-ai-smkg.netlify.app
- Backend: https://fitlife-jnz7.onrender.com
- Backend health check: https://fitlife-jnz7.onrender.com/api/health

Required server env vars:

- `MONGO_URI`
- `JWT_SECRET`
- `RESET_SECRET`
- `ANTHROPIC_API_KEY`
- `SMTP_EMAIL`
- `SMTP_PASS`
- `CLAUDE_MODEL=claude-sonnet-4-20250514`
- `AI_MOCK_MODE=false`

Required client env var:

- `REACT_APP_API_URL=https://fitlife-jnz7.onrender.com/api`

Netlify build settings:

- Base directory: `Client`
- Build command: `npm run build`
- Publish directory: `build`

Production API behavior:

- Local browser runs use `http://localhost:8000/api`.
- Deployed Netlify builds use `REACT_APP_API_URL` when set.
- If that env var is missing in production, the client falls back to `https://fitlife-jnz7.onrender.com/api`.

Verification URLs:

- Frontend app: https://fitlife-ai-smkg.netlify.app
- Backend API health: https://fitlife-jnz7.onrender.com/api/health

Latest verified production deploy:

- Netlify deploy ID: `6a006b46513ca02ee5f35abc`
- Verified bundle: `static/js/main.5c6dbd5e.js`
