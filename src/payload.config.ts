import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import type { GetPlatformProxyOptions } from "wrangler";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// `payload migrate`/`generate` run outside the Next/Workers runtime, so the
// Cloudflare bindings (D1) must come from wrangler's local proxy. Everywhere
// else, `next dev` and the deployed worker, uses the real runtime context.
const cloudflare = process.argv.find((value) =>
  value.match(/^(generate|migrate):?/),
)
  ? await getCloudflareContextFromWrangler()
  : await getCloudflareContext({ async: true });

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
    // For deploys, generate migrations with `pnpm payload migrate:create` and
    // run them automatically on worker cold start:
    //   prodMigrations: (await import('./migrations')).default,
  }),
  sharp,
  plugins: [],
});

function getCloudflareContextFromWrangler() {
  // Indirect specifier keeps `wrangler` out of the production worker bundle.
  return import(`${"__wrangler".replaceAll("_", "")}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
      } satisfies GetPlatformProxyOptions),
  );
}
