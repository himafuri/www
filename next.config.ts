import { withPayload } from "@payloadcms/next/withPayload";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

interface WebpackConfig {
  resolve?: {
    extensionAlias?: Record<string, string[]>;
  };
}

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  images: {
    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
    ],
  },
  webpack: (webpackConfig: WebpackConfig): WebpackConfig => {
    webpackConfig.resolve ??= {};
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });

// Makes Cloudflare bindings (D1, etc.) available to `next dev` via getCloudflareContext().
void initOpenNextCloudflareForDev();
