const { spawn } = require("child_process");

const { oraStreamWritable, oraStop, oraStart, oraSucceed, oraText } = require('./ora');
const commandSpawn = (...args) => {
    return new Promise((resolve) => {
        const childProcess = spawn(...args);
        //输出日志到控制台
        // childProcess.stdout.pipe(process.stdout);
        // childProcess.stderr.pipe(process.stderr);
        //到可视化界面
        oraStart()
        childProcess.on("close", () => {
            resolve();
        });
        childProcess.stdout.on('data', (data) => {
            oraSucceed(data.toString());
            oraText(data.toString());
        });
        childProcess.stderr.on('data', (data) => {
            oraSucceed(data.toString());
            oraText(data.toString());
        });
        childProcess.stderr.on('end', (data) => {
            oraSucceed()
        });
    });
};
module.exports = {
    commandSpawn,
};
