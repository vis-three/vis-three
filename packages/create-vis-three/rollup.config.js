import typescirpt from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { readFileSync } from "fs";

const { dependencies } = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
);

export default {
  input: "./src/main.ts",
  output: {
    file: "dist/main.js",
    format: "es",
  },
  external: Object.keys(dependencies),
  plugins: [json(), typescirpt()],
};
