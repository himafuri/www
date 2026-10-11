# Run and edit the HIMAFURI website

Use this guide to run the HIMAFURI site locally and edit its homepage through EmDash 1.2. Astro renders public pages on the server without React components or hydration. EmDash uses React for its admin panel.

## Run locally

Use Node.js 22.16 or newer and pnpm 9 or newer.

1. Install the dependencies:

   ```sh
   pnpm install
   ```

2. Generate the local encryption key. If `.env` already contains `EMDASH_ENCRYPTION_KEY`, keep that key and skip this command:

   ```sh
   pnpm exec emdash secrets generate --write .env
   ```

3. Start the development server:

   ```sh
   pnpm dev
   ```

Keep `.env` private. EmDash stores the local database in `data/emdash.db` and uploaded media in `uploads/`. Git ignores both paths.

`pnpm dev` seeds the original homepage into the local database, then starts the [local site](http://localhost:4321/). Seeding skips existing content, so restarting development preserves edits.

Astro may run the development server in the background when an agent starts it. Use these commands to manage that server:

- `pnpm exec astro dev status` checks the server status.
- `pnpm exec astro dev logs` shows the server logs.
- `pnpm exec astro dev stop` stops the server.

Open the [EmDash admin](http://localhost:4321/_emdash/admin/) and finish the setup wizard with your own name, email, and passkey. Keep the default **Sample content** choice to use the existing HIMAFURI homepage. The old `/admin` address redirects to EmDash.

## Restart after an editor save error

If an editor save reports `Vite module runner has been closed`, restart Astro. This error can follow a configuration or dependency reload:

```sh
pnpm exec astro dev stop
pnpm dev
```

## Edit the homepage

Open **Beranda** in the admin and edit its existing homepage entry. You can edit these fields:

- Page title and search description
- Community name, introduction, Discord button, and social links
- Logo, banner, and mascot
- Community statistics, vision, mission, and frequently asked questions, or FAQs
- Footer headings, guide links, copyright, and quotation

Replace images through the media picker and set their alt text.

Choose **Save** to create a draft and **Preview** to inspect it. Choose **Publish** to make the draft public, then refresh the homepage to see the changes. Server rendering shows published edits without a rebuild.

The migration preserved the placeholder FAQ answers, mascot, generic Discord and Instagram links, and guide anchors. The source had no English copy, so **EN** stays disabled until you add translations.

## Run project commands

Use these commands from the repository root:

| Command            | Action                                                               |
| ------------------ | -------------------------------------------------------------------- |
| `pnpm dev`         | Seed missing content and start the local site                        |
| `pnpm setup:local` | Seed the missing content model and content without overwriting edits |
| `pnpm check`       | Generate Astro and EmDash types and check the source                 |
| `pnpm build`       | Check types and build the Node server                                |
| `pnpm preview`     | Preview the production build locally                                 |
| `pnpm test`        | Run public-page browser checks                                       |

If Playwright's Chromium is missing, run `pnpm exec playwright install chromium` before tests.

The source seed is `.emdash/seed.json`. EmDash generates `emdash-env.d.ts` from its database model, so leave that file unchanged. On a fresh checkout, run `pnpm setup:local` before checks or builds to create the model. `pnpm dev` runs that command automatically.

### Prepare for a later deployment

This preview uses Node.js, SQLite, and local media storage. After owner review, Cloudflare deployment requires:

- An Astro Cloudflare adapter
- EmDash database and media storage configuration
- A planned transfer of content and media to production
