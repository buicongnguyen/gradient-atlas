import type { NextConfig } from "next";

const isGitHubPages = process.env.BUILD_TARGET === "github-pages";
const repositoryBasePath = process.env.GITHUB_REPOSITORY?.split("/")[1]
  ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
  : "/gradient-atlas";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGitHubPages ? repositoryBasePath : "",
  assetPrefix: isGitHubPages ? repositoryBasePath : "",
  turbopack: { root: process.cwd() },
};

export default nextConfig;
