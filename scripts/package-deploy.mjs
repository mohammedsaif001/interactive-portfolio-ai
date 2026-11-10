// Packages the Next.js standalone build into deploy/application.zip, ready to upload to Azure App Service.
// Run through `npm run deploy` (which builds first). Zips with forward slashes so Linux can unpack it.
import { ZipArchive } from "archiver";
import { cpSync, createWriteStream, existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const outDir = join(root, "deploy");
const stage = join(outDir, "_stage");
const zipPath = join(outDir, "application.zip");

if (!existsSync(join(standalone, "server.js"))) {
  console.error('Missing .next/standalone/server.js. Run "npm run build" first (and keep output: "standalone" in next.config.ts).');
  process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });

// The standalone output leaves out the static assets and public/, so add them back.
cpSync(standalone, stage, { recursive: true });
cpSync(join(root, ".next", "static"), join(stage, ".next", "static"), { recursive: true });
if (existsSync(join(root, "public"))) cpSync(join(root, "public"), join(stage, "public"), { recursive: true });

const output = createWriteStream(zipPath);
const zip = new ZipArchive({ zlib: { level: 9 } });
output.on("close", () => {
  rmSync(stage, { recursive: true, force: true });
  console.log(`\nCreated deploy/application.zip (${(statSync(zipPath).size / 1048576).toFixed(1)} MB)`);
  console.log("Upload it in Azure: Deployment Center > Manual Deployment (Push) > Publish files.");
  console.log("Startup command: node server.js   |   App setting: HOSTNAME=0.0.0.0");
});
zip.on("error", (err) => {
  throw err;
});
zip.pipe(output);
zip.directory(stage, false);
await zip.finalize();
