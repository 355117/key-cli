#!/usr/bin/env node
const { program } = require("commander");

const createCommands = require("./lib/core/create");
const helpOptions = require("./lib/core/help");

program.version(require("./package.json").version);

//帮助信息
helpOptions();
//创建配置
createCommands();
// program.option(
//     "-d,--dest <dest>",
//     "a destination folder, 例如：-d /src/components"
// );

program.parse(process.argv);
