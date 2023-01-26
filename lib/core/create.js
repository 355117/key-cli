const { program } = require("commander");

const { createProjectAction, createEjsPageAction } = require("./action");
const createCommands = () => {
    program
        .command("create <app-name>")
        .description("拉去远程代码并且安装依赖和自动启动项目")
        .action(createProjectAction);
    program
        .command("addPage <pageName>")
        .description("添加页面、路由和Pinia文件, 例如: addPage Home -d src/pages(默认值)")
        .action(createEjsPageAction);
};
module.exports = createCommands;
