import chalk from 'chalk';

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

export { log as default };
