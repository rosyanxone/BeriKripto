import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react()],
    server: {
      host:
        process.env.VITE_DEVELOPMENT == "local"
          ? "localhost"
          : "local.berikripto.me",
      port:
        process.env.VITE_DEVELOPMENT == "local"
          ? 5173
          : 80,
    },
  };
});
