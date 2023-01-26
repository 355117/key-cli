const fs = require("fs");

const writeTemplate = (template, path) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, template, "utf-8", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("文件写入成功");
            }
        });
    })
};
module.exports = {
    writeTemplate,
};
