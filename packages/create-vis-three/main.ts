import { Command } from "commander";
import inquirer from "inquirer";
import log from "./utils/log";
import copydir from "copy-dir";

import { name, version, description } from "./package.json";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { getDirname, jsonFileParse } from "./utils/fileUtils";
import chalk from "chalk";
import { cwd } from "process";
import spinner from "./utils/spinner";
import ejs from "ejs";
import rimraf from "rimraf";
import { execSync } from "child_process";

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

    const templateDir = path.resolve(
      getDirname(import.meta.url),
      `../template-${input.template}`
    );
    spinner.start(
      chalk.blue(`正在创建模板：${input.template} --> ${targetDir}`)
    );

    const err = copydir.sync(templateDir, targetDir, {
      utimes: true, // keep add time and modify time
      mode: true, // keep file mode
      cover: true, // cover file when exists, default is true
    });

    if (err) {
      spinner.stop();
      log.error(err);
      return;
    }

    spinner.succeed(chalk.green("模板创建完成！"));

    const totalParams = {} as any;

    if (existsSync(path.resolve(targetDir, `./build`))) {
      spinner.start(chalk.blue(`正在生成文件...`));

      const buildDir = path.resolve(targetDir, `./build`);

      const fileList = jsonFileParse(path.resolve(buildDir, "./index.json"));

      for (const params of fileList) {
        spinner.info(chalk.blue(`正在生成${params.name}...`));

        const template = readFileSync(
          path.resolve(buildDir, `./${params.name}.ejs`),
          "utf-8"
        );

        let data = {} as any;

        if (existsSync(path.resolve(buildDir, `./${params.name}.json`))) {
          data = await inquirer.prompt(
            jsonFileParse(path.resolve(buildDir, `./${params.name}.json`))
          );
        }

        Object.assign(totalParams, data);

        const result = ejs.render(template, totalParams);

        writeFileSync(
          path.resolve(path.resolve(targetDir, `./${params.url}`)),
          result
        );

        spinner.succeed(
          chalk.green(
            `${params.name} ---> ${path.resolve(
              path.resolve(targetDir, `./${params.url}`)
            )}`
          )
        );
      }

      rimraf(buildDir);

      spinner.succeed(chalk.green(`文件生成完毕！`));
    }

    if (existsSync(path.resolve(targetDir, `./script`))) {
      spinner.info(chalk.blue(`正在运行脚本...`));

      const scriptDir = path.resolve(targetDir, `./script`);

      const { default: script } = await import(
        `file://${path.resolve(scriptDir, "./index.mjs")}`
      );

      script(
        Object.assign(totalParams, {
          targetDir,
        })
      );

      rimraf(scriptDir);

      spinner.succeed(chalk.green(`脚本运行完毕！`));
    }

    log.success("\n下一步：");
    log.success(`cd ${targetDir}`);
    log.success(`npm i`);
  });

program.parse();
