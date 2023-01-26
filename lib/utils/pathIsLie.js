const path = require("path");
const fs = require("fs");

const pathIsLie = (pathName) => {
   // 路径最后如果是文件名，就去掉文件名 例如：/a/b/c/d.js => /a/b/c
    if(pathName.split(".").length>1){
       pathName = pathName.split("\\")
       pathName.pop()
       pathName = pathName.join("\\")
    }

    if (fs.existsSync(pathName)) {
        return;
    } else {
        //判断父级路径是否存在
        pathIsLie(path.dirname(pathName));
        fs.mkdirSync(pathName);
    }
};

module.exports = pathIsLie;
