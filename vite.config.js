import path from "path";
import { fileURLToPath } from "url";

import inject from "@rollup/plugin-inject";
import autoprefixer from "autoprefixer";
import fs from "fs-extra";
import glob from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  root: path.resolve(__dirname, "src"),
  base: "./",
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  publicDir: "../public",
  build: {
    outDir: "../dist",
    minify: false,
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname, "src", "*.html")),
      output: {
        dir: "dist",
        chunkFileNames: "js/[name].js",
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split(".").pop();
          if (extType === "css") {
            return "css/[name].[ext]";
          } else if (["png", "jpg", "jpeg", "gif", "svg"].includes(extType)) {
            return "images/[name].[ext]";
          } else {
            return "[ext]/[name].[ext]";
          }
        },
      },
    },
  },

  plugins: [
    inject({
      $: "jquery",
      jQuery: "jquery",
    }),
    {
      name: "copy-assets",
      async writeBundle() {
        const srcDir = path.resolve(__dirname, "src");
        const outputDir = path.resolve(__dirname, "dist");
        // Copy fonts directory
        if (fs.existsSync(path.resolve(srcDir, "fonts"))) {
          await fs.copy(
            path.resolve(srcDir, "fonts"),
            path.resolve(outputDir, "fonts")
          );
        }
      },
    },
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
};
