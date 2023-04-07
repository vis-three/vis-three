import { Command } from "commander";
import inquirer from "inquirer";
import log from "./utils/log";
import ora from "ora";

import { name, version, description } from "../package.json";
import { existsSync } from "fs";
import path from "path";
import { getDirname } from "./utils/fileUtils";

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
