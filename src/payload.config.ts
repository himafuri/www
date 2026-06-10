import {
  sqliteD1Adapter,
  type SQLiteAdapterArgs,
} from "@payloadcms/db-d1-sqlite";
import {
  getCloudflareContext,
  type CloudflareContext,
} from "@opennextjs/cloudflare";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import type { GetPlatformProxyOptions, PlatformProxy } from "wrangler";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// `payload migrate`/`generate` run outside the Next/Workers runtime, so the
// Cloudflare bindings (D1) must come from wrangler's local proxy. Everywhere
// else, `next dev` and the deployed worker, uses the real runtime context.
const cloudflare = await resolveCloudflareContext();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env["PAYLOAD_SECRET"] ?? "",
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

type LocalCloudflareEnv = CloudflareEnv & {
  D1: SQLiteAdapterArgs["binding"];
};

type RuntimeCloudflareContext = Omit<CloudflareContext, "env"> & {
  env: LocalCloudflareEnv;
};

type LocalCloudflareContext =
  | RuntimeCloudflareContext
  | PlatformProxy<LocalCloudflareEnv>;

type WranglerPlatformProxyModule = Pick<
  typeof import("wrangler"),
  "getPlatformProxy"
>;

async function resolveCloudflareContext(): Promise<LocalCloudflareContext> {
  // `payload migrate`/`generate` declare up front that they run outside the
  // runtime, so go straight to wrangler's local proxy for them.
  const isStandaloneCommand = process.argv.some(
    (value) => /^(generate|migrate):?/.exec(value) !== null,
  );
  if (isStandaloneCommand) {
    return getCloudflareContextFromWrangler();
  }

  // Inside `next dev` and the deployed worker this returns the real runtime
  // context. The Playwright/Vitest runners call getPayload() directly in a bare
  // Node process where that context was never initialized, so fall back to the
  // same local proxy `migrate`/`generate` use.
  try {
    const context = await getCloudflareContext({
      async: true,
    });
    if (!hasLocalCloudflareEnv(context)) {
      throw new Error("Cloudflare context is missing the D1 binding.");
    }

    return context;
  } catch {
    return getCloudflareContextFromWrangler();
  }
}

async function getCloudflareContextFromWrangler(): Promise<
  PlatformProxy<LocalCloudflareEnv>
> {
  // Indirect specifier keeps `wrangler` out of the production worker bundle.
  const wranglerSpecifier = "__wrangler".replaceAll("_", "");
  const wrangler = await importWrangler(wranglerSpecifier);

  const cloudflareEnv = process.env["CLOUDFLARE_ENV"];
  const options: GetPlatformProxyOptions =
    cloudflareEnv === undefined ? {} : { environment: cloudflareEnv };

  return wrangler.getPlatformProxy<LocalCloudflareEnv>(options);
}

function hasLocalCloudflareEnv(
  context: CloudflareContext,
): context is RuntimeCloudflareContext {
  return "D1" in context.env;
}

async function importWrangler(
  specifier: string,
): Promise<WranglerPlatformProxyModule> {
  const wranglerModule: unknown = await import(specifier);
  if (!isWranglerPlatformProxyModule(wranglerModule)) {
    throw new Error("Wrangler module did not expose getPlatformProxy.");
  }

  return wranglerModule;
}

function isWranglerPlatformProxyModule(
  value: unknown,
): value is WranglerPlatformProxyModule {
  return (
    typeof value === "object" &&
    value !== null &&
    "getPlatformProxy" in value &&
    typeof value.getPlatformProxy === "function"
  );
}
