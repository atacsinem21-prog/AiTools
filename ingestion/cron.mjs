import dotenv from "dotenv";
import cron from "node-cron";
import { spawn } from "node:child_process";

dotenv.config({ path: ".env.local" });
dotenv.config();

function runIngestion() {
  const child = spawn("node", ["ingestion/fetch-tools.mjs"], {
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", (code) => {
    console.log(`Ingestion process finished with code ${code ?? 0}.`);
    if (code === 0) {
      const compareChild = spawn("node", ["ingestion/generate-compares.mjs"], {
        stdio: "inherit",
        shell: true,
      });
      compareChild.on("exit", (compareCode) => {
        console.log(`Compare generation finished with code ${compareCode ?? 0}.`);
      });
    }
  });
}

console.log("Cron scheduler started. Running every 6 hours.");
cron.schedule("0 */6 * * *", () => {
  console.log("Fetching new AI tools...");
  runIngestion();
});

runIngestion();
