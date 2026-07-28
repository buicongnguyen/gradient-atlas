import { spawn } from "node:child_process";
import path from "node:path";

const executable = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [executable, "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    BUILD_TARGET: "github-pages",
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://buicongnguyen.github.io/gradient-atlas/",
  },
});

child.on("exit", (code) => process.exit(code ?? 1));
