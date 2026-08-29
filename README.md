# www (HIMAFURI's official website)

A [Payload CMS](https://payloadcms.com) 3.x project (Next.js 16) that runs on Cloudflare Workers, backed by a Cloudflare D1 (SQLite) database.

## Local development setup

Prerequisites: **Node.js** (>= 20.9.0, Node 24 recommended) and **pnpm** (>= 9).

### 1. Clone the repo & install dependencies

```bash
git clone <repo-url>
cd www
pnpm install
```

### 2. Create your local env files

These files hold your local `PAYLOAD_SECRET` and are gitignored, so every contributor creates their own. Generate a secret and write both files in one go.

**macOS / Linux (bash, Git Bash, or WSL):**

```bash
SECRET=$(openssl rand -hex 32)
echo "PAYLOAD_SECRET=$SECRET" > .env
printf "NEXTJS_ENV=development\nPAYLOAD_SECRET=%s\n" "$SECRET" > .dev.vars
```

**Windows (PowerShell):**

```powershell
$SECRET = -join ((1..32) | ForEach-Object { '{0:x2}' -f (Get-Random -Maximum 256) })
"PAYLOAD_SECRET=$SECRET" | Out-File -FilePath .env -Encoding ascii
"NEXTJS_ENV=development`nPAYLOAD_SECRET=$SECRET" | Out-File -FilePath .dev.vars -Encoding ascii
```

`.env` is loaded for the Next.js dev server. `.dev.vars` is used when running `pnpm preview` (the Cloudflare Workers build). The secret just needs to be a long random string for local use.

### 3. Start the app

```bash
pnpm dev
```

Once you see `Ready`, open:

```txt
http://localhost:3000/admin
```

Follow the on-screen prompt to create your first admin user. Edits under `./src` hot-reload automatically.

There is no separate database to install or run. The Cloudflare D1 database runs locally through wrangler, and its schema is stored in `.wrangler/` (gitignored). Delete that folder if you ever want a fresh database.

### Common scripts

```bash
pnpm dev             # start dev server
pnpm build           # build Next.js production bundle
pnpm lint            # run ESLint
pnpm format          # format files with Prettier
pnpm test            # run integration + e2e tests
pnpm test:int        # run integration tests (vitest)
pnpm test:e2e        # run e2e tests (playwright)
pnpm generate:types  # generate Payload TypeScript types
pnpm generate:importmap # generate Payload admin import map
```

## How it works

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for how to extend these.

- **Users** (authentication): an auth-enabled collection whose members can access the admin panel. See the [Authentication docs](https://payloadcms.com/docs/authentication/overview).
- **Media**: an uploads-enabled collection with preconfigured image sizes and focal point support.

## Deploying to Cloudflare

This app deploys to Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). The high-level flow:

1. `wrangler login` (or set `CLOUDFLARE_API_TOKEN`).
2. `wrangler d1 create www-db`, then paste the returned `database_id` into `wrangler.jsonc`.
3. `wrangler secret put PAYLOAD_SECRET` to set the production secret.
4. Generate migrations with `pnpm payload migrate:create`, then uncomment the `prodMigrations` line in `src/payload.config.ts` so they run on the worker's cold start.
5. `pnpm deploy`.

## Questions

Start a [GitHub discussion](https://github.com/payloadcms/payload/discussions), or ask in the [Payload Discord](https://discord.com/invite/payload).
