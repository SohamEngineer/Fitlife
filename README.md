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
