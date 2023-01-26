const path = require("path");
const ejs = require("ejs");

const Pro = function (path, obj) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(path, obj, {}, (err, str) => {
            if (err) {
                reject(err);
            } else {
                resolve(str);
            }
        });
    });
}
const compilePath = (pathName, obj) => {
    return Pro(path.resolve(__dirname, pathName), obj)
}
module.exports = {
    compilePath,
};
