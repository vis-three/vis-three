import { dirname } from "path";
import { fileURLToPath } from "url";

export const getDirname = function () {
  return dirname(fileURLToPath(import.meta.url));
};
