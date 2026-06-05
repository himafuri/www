# www (HIMAFURI's official website)

A [Payload CMS](https://payloadcms.com) 3.x project (Next.js 16) that runs on Cloudflare Workers, backed by a Cloudflare D1 (SQLite) database.

## Local development setup

Everything runs inside Docker, so the only things you need installed on your machine are **Docker** (Docker Desktop on macOS/Windows, or Docker Engine on Linux) and **git**. Node.js and pnpm run inside the container, pinned to Node 24 LTS and pnpm 10, so you do not need them on your host. Payload does not support pnpm 11 yet, which is why the version is pinned.

### 1. Clone the repo

```bash
git clone <repo-url>
cd www
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

`.env` is what `docker compose` loads for the dev server. `.dev.vars` is used only if you later run `pnpm preview` (the Cloudflare Workers build). The secret just needs to be a long random string for local use.

### 3. Start the app

```bash
docker compose up
```

The first run pulls the Node image and installs dependencies, so it takes a few minutes. After that it is fast. Once you see `Ready`, open:

```
http://localhost:3000/admin
```

Follow the on-screen prompt to create your first admin user. Edits under `./src` hot-reload.

That is the whole setup. There is no separate database to install or run. The Cloudflare D1 database runs locally through wrangler, and its schema is created automatically the first time you load the app (dev uses schema push, so no migrations are needed locally).

### Stopping, restarting, and logs

```bash
docker compose down      # stop and remove the container
docker compose up -d     # start in the background
docker compose logs -f   # follow logs when running in the background
```

Your local database lives in `.wrangler/` (gitignored), so the admin user and any content you create persist across restarts. Delete that folder if you ever want a clean database.

### Running project commands

The Node toolchain lives in the container, so run pnpm scripts there rather than on your host. These assume you have started the app at least once (so dependencies are installed):

```bash
docker compose run --rm payload sh -lc "corepack enable && pnpm lint"
docker compose run --rm payload sh -lc "corepack enable && pnpm generate:types"
```

Or open a shell inside the toolchain:

```bash
docker compose run --rm payload sh
```

### Common commands cheat-sheet

There are two ways to run a command in the container, and the right one depends on whether the app is already running:

- **`docker compose exec`** runs the command inside the container that `docker compose up` already started. Prefer this while the app is up: it is faster and `pnpm` is already on the path (no `corepack enable` needed).
- **`docker compose run --rm`** spins up a fresh throwaway container for a single command and deletes it afterwards. Use this when the app is **not** running. Because the container is fresh, prefix toolchain commands with `corepack enable &&`.

Day-to-day lifecycle:

```bash
docker compose up            # start; logs stream here, Ctrl+C stops it
docker compose up -d         # start in the background (detached)
docker compose down          # stop and remove the container
docker compose down -v       # also delete the node_modules volumes (forces a clean reinstall)
docker compose restart       # quick restart without removing the container
docker compose logs -f       # follow logs of a backgrounded container
docker compose ps            # show whether the app is running and which ports are mapped
```

Running project commands (app already running, via `exec`):

```bash
docker compose exec payload sh                 # open a shell; then just run `pnpm ...`
docker compose exec payload pnpm lint
docker compose exec payload pnpm generate:types
docker compose exec payload pnpm test:int      # integration tests (vitest)
docker compose exec payload pnpm install       # pick up new deps after editing package.json
```

Running project commands (app not running, via `run`):

```bash
docker compose run --rm payload sh -lc "corepack enable && pnpm lint"
docker compose run --rm payload sh             # fresh one-off shell
```

Good to know:

- Editing files under `./src` hot-reloads automatically; no restart needed. Only changing `docker-compose.yml` or dependencies requires a restart or reinstall.
- The database is the local `.wrangler/` folder, not a container. It survives `docker compose down`. Delete that folder for a clean database.
- `down -v` is the only destructive flag here: it wipes the `node_modules` volumes, not your source code.
- Integration tests (`pnpm test:int`) run in the `payload` container, but the Playwright e2e tests need a browser and run in their own service. See [Running end-to-end (Playwright) tests](#running-end-to-end-playwright-tests).

### Running end-to-end (Playwright) tests

The integration tests run in the normal `payload` container, but the Playwright e2e tests need a real browser, which `node:24-slim` does not have. They run in a dedicated `playwright` service that uses [Microsoft's official Playwright image](https://playwright.dev/docs/docker) (Chromium plus its system libraries, pre-pinned to the `@playwright/test` version in `package.json`). The service sits behind a `test` profile, so a normal `docker compose up` never starts it.

Run the whole e2e suite:

```bash
docker compose run --rm playwright
```

The first run pulls the Playwright image (~2.7 GB) and installs dependencies into a separate volume, so it takes a few minutes; later runs are quick. The service starts its own `pnpm dev` inside the container (via the `webServer` block in `playwright.config.ts`), seeds a test user, runs the specs against `http://localhost:3000`, and writes an HTML report to `playwright-report/` (gitignored). The terminal shows live `list` output; to browse the HTML report afterwards run `docker compose run --rm playwright pnpm exec playwright show-report`.

To run a single spec or debug interactively, open a shell in the Playwright image (the browser and its deps are already there):

```bash
docker compose run --rm playwright bash
# then inside the container:
corepack enable && corepack prepare pnpm@latest-10 --activate && pnpm install
pnpm test:e2e tests/e2e/frontend.e2e.spec.ts
```

Notes:

- The e2e tests use the same local D1 database in `.wrangler/` and seed/delete a `dev@payloadcms.com` user. Run them with the dev server (`docker compose up`) stopped so the two do not write to that SQLite database at the same time.
- The `playwright` service has its own `node_modules` volume because its image ships a different Node version than the dev service. `docker compose down -v` clears both volumes.

### Troubleshooting

- **`docker compose up` fails complaining about `.env`:** make sure you completed step 2. The file must exist.
- **Port 3000 already in use:** stop whatever is using it, or change the host port in `docker-compose.yml` (for example `"3001:3000"`).
- **First page load is slow:** the dev server compiles the Payload admin on the first request. Later loads are quick.
- **`docker compose run --rm playwright` is slow the first time:** it pulls Microsoft's Playwright image (~2.7 GB) once, then reuses it.
- **e2e tests fail to seed a user, or you see "database is locked":** stop the dev server with `docker compose down` before running e2e. Both the dev server and the tests open the same local D1 database in `.wrangler/`.

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
