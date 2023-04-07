import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { existsSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

var log = {
    error: (str) => {
        console.log(chalk.red(str));
    },
    info: (str) => {
        console.log(chalk.blue(str));
    },
    warn: (str) => {
        console.log(chalk.yellow(str));
    },
    success: (str) => {
        console.log(chalk.green(str));
    },
};

var name = "create-vis-three";
var version = "0.6.0";
var description = "vis-three create";

const getDirname = function () {
    return dirname(fileURLToPath(import.meta.url));
};

const program = new Command();
program.name(name).version(version).description(description);
program
    .argument("<dir>")
    .description("创建模块")
    .option("-t --template <template>", "选择模板")
    .action(async (dir, options) => {
    const targetDir = path.resolve(getDirname(), `./${dir}`);
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
    console.log(input);
});
program.parse();
