import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "./", // very important for vercel static asset paths

  resolve: {
    alias: [
      {
        find: "@/components",
        replacement: path.resolve(rootDir, "./src/features/shared/components"),
      },
      {
        find: "@",
        replacement: path.resolve(rootDir, "./src"),
      },
    ],
  },
});
