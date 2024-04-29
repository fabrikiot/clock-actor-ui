import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfClock",
      filename: "remoteEntry.js",
      exposes: {
        "./ClockWidget": "./src/widget/clock-widget",
      },
      shared: ["react", "react-dom", "actor-system"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
