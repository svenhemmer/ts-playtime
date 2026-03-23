import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@models": path.resolve(__dirname, "src/models"),
      "@core": path.resolve(__dirname, "src/core"),
      "@rendering": path.resolve(__dirname, "src/rendering"),
      "@input": path.resolve(__dirname, "src/input"),
      "@math": path.resolve(__dirname, "src/math"),
    },
  },
});