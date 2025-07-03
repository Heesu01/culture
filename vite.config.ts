import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "시장에 가면",
          short_name: "시장에가면",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#FF8000",
          icons: [
            {
              src: "/vite.svg",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/vite.svg",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
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
