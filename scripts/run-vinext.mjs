import { spawn } from "node:child_process";
import path from "node:path";

const command = process.argv[2];
const allowed = new Set(["dev", "build", "start"]);

if (!allowed.has(command)) {
  console.error(`Expected one of: ${[...allowed].join(", ")}`);
  process.exit(1);
}

const executable = path.join(process.cwd(), "node_modules", "vinext", "dist", "cli.js");

const child = spawn(process.execPath, [executable, command, ...process.argv.slice(3)], {
  stdio: "inherit",
  env: {
    ...process.env,
    WRANGLER_LOG_PATH: ".wrangler/wrangler.log",
  },
});

child.on("exit", (code) => process.exit(code ?? 1));
