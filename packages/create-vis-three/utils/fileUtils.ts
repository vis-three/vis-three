import { readFileSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const getDirname = function (url: string) {
  return dirname(fileURLToPath(url));
};

export const jsonFileParse = function (url: string) {
  return JSON.parse(readFileSync(url, "utf-8"));
};
