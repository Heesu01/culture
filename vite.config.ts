import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: isDev
      ? {
          https: {
            key: fs.readFileSync(
              path.resolve(__dirname, "cert/localhost-key.pem")
            ),
            cert: fs.readFileSync(
              path.resolve(__dirname, "cert/localhost.pem")
            ),
          },
          port: 3000,
        }
      : {
          port: 3000,
        },
  };
});
