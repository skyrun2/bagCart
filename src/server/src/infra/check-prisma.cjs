const { execFileSync } = require("node:child_process");

try {
  execFileSync(
    process.execPath,
    [
      "-e",
      "const { PrismaClient } = require('@prisma/client'); new PrismaClient();"
    ],
    {
      stdio: "pipe",
      cwd: process.cwd()
    }
  );

  console.log(" Prisma Client is generated.");
} catch {
  console.error("\nPrisma Client is missing or failed to initialize.");
  console.error("Run:\n npm i \n npx prisma generate\n");
  process.exit(1);
}