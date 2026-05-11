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
- `SMTP_EMAIL`
- `SMTP_PASS`

Optional AI server env vars:

- `ANTHROPIC_API_KEY` for real Claude plan generation.
- `CLAUDE_MODEL=claude-sonnet-4-6`
- `AI_MOCK_MODE=false`
- If `ANTHROPIC_API_KEY` is missing, Fitlife automatically uses its built-in demo planner so onboarding and dashboard plan generation still work without a paid API key.
- If the Anthropic account has no credits, Fitlife returns a clean billing message instead of broken JSON. Add credits or set `AI_MOCK_MODE=true` to use demo plans.

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

- Netlify deploy ID: `6a0200b94b316f007f0b669a`
- Verified bundles: `static/js/main.fa0a077f.js`, `static/css/main.a73d61fd.css`
