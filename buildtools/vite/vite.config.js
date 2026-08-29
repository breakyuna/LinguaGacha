import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { frontend_resolve_alias, project_path } from "./project-paths";
export default defineConfig({
    root: project_path("src/frontend"),
    publicDir: project_path("public"),
    server: {
        host: "127.0.0.1",
    },
    resolve: {
        alias: frontend_resolve_alias,
    },
    plugins: [react(), tailwindcss()],
    build: {
        outDir: project_path("build", "dist"),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: project_path("src/frontend/index.html"),
            },
        },
    },
});
