import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const getDirname = function (url) {
    return dirname(fileURLToPath(url));
};
const jsonFileParse = function (url) {
    return JSON.parse(readFileSync(url, "utf-8"));
};

export { getDirname, jsonFileParse };
