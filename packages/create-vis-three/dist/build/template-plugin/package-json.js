import inquirer from 'inquirer';

var pkgInquirer = async () => await inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "补充模块名@vis-three/plugin-：",
    },
    {
        type: "input",
        name: "author",
        message: "作者：",
        default: "Shiotsuki_",
    },
]);

export { pkgInquirer as default };
