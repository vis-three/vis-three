import { Command } from 'commander';
import inquirer from 'inquirer';
import log from './utils/log.js';
import copydir from 'copy-dir';
import { name, version, description } from './package.json.js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { getDirname, jsonFileParse } from './utils/fileUtils.js';
import chalk from 'chalk';
import { cwd } from 'process';
import spinner from './utils/spinner.js';
import ejs from 'ejs';
import rimraf from 'rimraf';

const program = new Command();
program.name(name).version(version).description(description);
program
    .argument("<dir>")
    .description("创建模块")
    .option("-t --template <template>", "选择模板")
    .action(async (dir, options) => {
    const targetDir = path.resolve(cwd(), `./${dir}`);
    if (existsSync(targetDir)) {
        log.error(`已经存在此文件夹：${targetDir}`);
        return;
    }
    let template = options.template;
    const templateList = ["default", "plugin", "strategy", "module"];
    if (template && !templateList.includes(template)) {
        log.warn(`不支持当前模板：${template}，请重新选择。`);
        template = "";
    }
    let input = {
        template,
    };
    if (!template) {
        input = await inquirer.prompt({
            type: "list",
            name: "template",
            message: "选择模板：",
            choices: templateList,
            default: 0,
        });
    }
    const templateDir = path.resolve(getDirname(import.meta.url), `../template-${input.template}`);
    spinner.start(chalk.blue(`正在创建模板：${input.template} --> ${targetDir}`));
    const err = copydir.sync(templateDir, targetDir, {
        utimes: true,
        mode: true,
        cover: true, // cover file when exists, default is true
    });
    if (err) {
        spinner.stop();
        log.error(err);
        return;
    }
    spinner.succeed(chalk.green("模板创建完成！"));
    if (!existsSync(path.resolve(targetDir, `./build`))) {
        return;
    }
    spinner.start(chalk.blue(`正在生成文件...`));
    const buildDir = path.resolve(targetDir, `./build`);
    const fileList = jsonFileParse(path.resolve(buildDir, "./index.json"));
    for (const params of fileList) {
        spinner.info(chalk.blue(`正在生成${params.name}...`));
        const template = readFileSync(path.resolve(buildDir, `./${params.name}.ejs`), "utf-8");
        const options = jsonFileParse(path.resolve(buildDir, `./${params.name}.json`));
        const data = await inquirer.prompt(options);
        const result = ejs.render(template, data);
        writeFileSync(path.resolve(path.resolve(targetDir, `./${params.url}`)), result);
        spinner.succeed(chalk.green(`${params.name}--->${path.resolve(path.resolve(targetDir, `./${params.url}`))}`));
    }
    spinner.succeed(chalk.green(`文件生成完毕！`));
    rimraf(buildDir);
    log.success("\n下一步：");
    log.success(`cd ${targetDir}`);
    log.success(`npm i`);
});
program.parse();
