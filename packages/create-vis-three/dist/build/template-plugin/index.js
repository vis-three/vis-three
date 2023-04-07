import chalk from 'chalk';
import ejs from 'ejs';
import pkgInquirer from './package-json.js';
import path from 'path';
import { getDirname } from '../../utils/fileUtils.js';
import { readFileSync, writeFileSync } from 'fs';
import spinner from '../../utils/spinner.js';

var templatePlugin = async (targetDir) => {
    spinner.info(chalk.blue(`正在生成package.json...`));
    const pkgParams = await pkgInquirer();
    const pkgTemplate = readFileSync(path.resolve(getDirname(import.meta.url), `./package-json.ejs`), "utf-8");
    const result = ejs.render(pkgTemplate, pkgParams);
    writeFileSync(path.resolve(targetDir, `./package.json`), result);
    spinner.succeed("生成package.json.");
};

export { templatePlugin as default };
