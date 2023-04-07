import typescirpt from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { readFileSync } from "fs";

const { dependencies } = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
);

export default {
  input: "./main.ts",
  output: {
    dir: "dist",
    format: "es",
    preserveModules: true,
  },
  external: Object.keys(dependencies),
  plugins: [json(), typescirpt()],
};
