import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue"; //to under stand vue
import dts from "vite-plugin-dts"; //bundle the decelerations and merge types in single file and its info and the IntelliSense
import path from "path";

const reporterSet: string[] = ["verbose", "html"]; //fix the reporters in a variable (Array)

export default defineConfig({
  plugins: [vue(), dts({ include: "src" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@root": path.relative(__dirname, "./"),
    },
  },
  test: {
    coverage: {
      reporter: ["text", "html"],
      enabled: true,
    },
    globals: false,
    environment: "jsdom",
    include: ["src/**/*.{coca,test,spec}.ts"],
    exclude: [
      "src/__tests__/api-mock.test.ts",
      "src/__tests__/create-user.test.ts",
      "src/__tests__/fullName.coca.ts",
      // "src/__tests__/linesExec.spec.ts",
      "src/__tests__/navigation.test.ts",
      "src/__tests__/performance.test.ts",
      "src/__tests__/snapshot.test.ts",
    ],
    // setupFiles: [ "@app/../src/__tests__/fullName.spec.ts"],
    testTimeout: 3000,
    reporters: reporterSet, // ['tap'] ['dot'] ['json'] ['junit'] ['default']['verbose']
  },
});
