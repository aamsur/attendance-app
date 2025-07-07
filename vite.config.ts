import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { VitePWA } from "vite-plugin-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/attendance-app/dist/",

  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Presensia",
        short_name: "Presensia",
        description: "Smart employee attendance tracker",
        theme_color: "#3880ff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/attendance-app/dist/",
        icons: [
          {
            src: "img/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,woff2,ico}"],
        navigateFallback: "offline.html", // 👈 fallback when offline
        navigateFallbackDenylist: [/^\/api/], // optional
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,
    port: 8100,
    watch: {
      ignored: ["**/.history/**"],
    },
  },
});
