# Stadli Minimal Cloudflare Stack (Boilerplate)

- Static assets via Workers Static Assets (`public/`)
- Minimal Worker routes: `/home`, `/contact`, `/health`
- D1 example write on POST `/contact`
- Tailwind via CDN (no build step)

## Local
```bash
npm i
npx wrangler login
wrangler d1 create stadli
wrangler kv namespace create SESSIONS
wrangler kv namespace create CONFIG
wrangler r2 bucket create <your-bucket-name>

export STADLI_D1_ID=$(wrangler d1 list | jq -r '.[] | select(.name=="stadli").uuid')
export STADLI_KV_ID=$(wrangler kv namespace list | jq -r '.[] | select(.title|endswith("SESSIONS")).id')
export STADLI_CONFIG_KV_ID=$(wrangler kv namespace list | jq -r '.[] | select(.title|endswith("CONFIG")).id')
export STADLI_R2_BUCKET=<your-bucket-name>

wrangler d1 execute stadli --file migrations/0001_init.sql --remote
npm run dev
```

## Deploy
```bash
npm run deploy
```