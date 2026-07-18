import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    dts({
      include: ["lib"],
      outDirs: "dist",
      exclude: ["**/*.test.*", "**/*.stories.*"],
      bundleTypes: true,
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: resolve(__dirname, "lib/index.ts"),
      },
      formats: ["es"],
    },
    rolldownOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "@chakra-ui/react",
        "@emotion/react",
        "@tanstack/react-table",
      ],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react/jsx-runtime": "jsx",
          "@chakra-ui/react": "Chakra",
          "@emotion/react": "EmotionReact",
          "@tanstack/react-table": "ReactTable",
        },
      },
    },
  },
});
