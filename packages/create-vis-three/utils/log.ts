import chalk from "chalk";

export default {
  error: (str: string) => {
    console.log(chalk.red(str));
  },
  info: (str: string) => {
    console.log(chalk.blue(str));
  },
  warn: (str: string) => {
    console.log(chalk.yellow(str));
  },
  success: (str: string) => {
    console.log(chalk.green(str));
  },
};
