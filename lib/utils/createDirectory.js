const path = require("path")
const { writeTemplate } = require("./writeFile");
const { compilePath } = require("./compile");
const pathIsLie = require("./pathIsLie")
/**
 * 
 * @param {模板的路径} fromPath 
 * @param {目标路径} toPath 
 * @param {将作为ejs模板内部变量的使用} detail 
 */
async function createDirectory(fromPath, toPath, detail = {}) {
   let result = await compilePath(fromPath, detail)
   let pathName = path.resolve(toPath)
   pathIsLie(pathName)
   await writeTemplate(result, pathName)
}
module.exports = {
   createDirectory
}