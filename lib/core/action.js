const path = require("path");
const child_process = require("child_process");//用于下载远程仓库
//命令行工具
const { program } = require("commander");
//命令行可视化交互工具
const inquirer = require("inquirer");

const { commandSpawn } = require("../utils/npm-run");
const pathIsLie = require("../utils/pathIsLie");
const { prompts, cdnPrompts, toolCdn } = require("../config/inquirer-config");
const { oraStart, oraSucceed } = require("../utils/ora");
const { createDirectory } = require("../utils/createDirectory");
const nodeProcessFn = require("../config/node-process-config");

//下载仓库并工根据选项配置并执行npm install
const createProjectAction = async (project) => {
    //获取npm安装需要的配置
    const nodeProcessConfig = nodeProcessFn({ cwd: `./${project}` });
    console.log("Ready to start downloading...(准备开始下载...)");
    oraStart("Cloning remote warehouse...(正在克隆远程仓库...)");
    // clone git的项目
    child_process.execSync(`git clone https://github.com/355117/vue-tool.git ${project}`);
    oraSucceed("Clone succeeded");
    let answers1, answers2, answers3, answers4;
    answers1 = await inquirer.prompt(prompts[0])
    if (answers1.configure.includes("store")) {
        answers2 = await inquirer.prompt(prompts[1])
    }

    answers3 = await inquirer.prompt(cdnPrompts)
    //不同平台的npm命令
    const npmName = process.platform === "win32" ? "npm.cmd" : "npm";
    let selectConfig = []
    if (answers1.tool) {
        selectConfig = selectConfig.concat(answers1.tool)
    }
    if (answers1.configure) {
        selectConfig = selectConfig.concat(answers1.configure)
    }
    if (answers1.features) {
        selectConfig = selectConfig.concat(answers1.features)
    }
    if (answers2 && answers2.store) {
        selectConfig = selectConfig.concat(answers2.store)
    }
    if (answers3 && answers3.tool) {
        selectConfig = selectConfig.concat(answers3.tool)
    }
    let cdnList = []
    selectConfig.forEach((item) => {
        if (item !== "Vuex" && item !== "store" && item !== "normalize_css") {
            cdnList.push({
                "name": `${item}`,
                "value": `${item}`,
                "short": `${item}`,
                "description": `Install ${item}`,
                "checked": true
            })
        }
    })
    let tool = {}
    answers4 = await inquirer.prompt(toolCdn(cdnList))
    answers4.toolCdn.forEach((item) => {
        tool[item] = item
    })
    //需要使用CDN时，在prod移除打包和在html中引入CDN
    createDirectory('../templates/vue-webpack-prod.ejs', `${project}/config/webpack.prod.js`, { tool })
    createDirectory('../templates/vue-weboack-prod-html.ejs', `${project}/public/index.html`, { tool })
    oraStart("Installing dependencies...(正在安装依赖...)");
    await commandSpawn(npmName, ...nodeProcessConfig.runInstall);
    oraSucceed("Dependency installation succeeded(依赖安装成功)");
    let deploy = {}
    console.log(selectConfig);
    //使用forEach循环来安装依赖不行，因为下载任务过多，虽然使用了async await，
    // 但是还是会出现问题，并行下载导致有的下载失败，根据协程的原理，并行下载虽然在等待，
    // 但是主线程执行的任务依赖于下载的依赖，所以不能使用forEach循环
    // selectConfig.forEach(async (item, index) => {
    //     if (item == "router") {
    //         deploy[item] = item
    //         //写入router目录
    //         createDirectory("../templates/vue-router.ejs", `${project}/src/router/index.js`)
    //         //写入home页面和home路由
    //         createDirectory("../templates/pages/home/home.ejs", `${project}/src/pages/home/Home.vue`)
    //         createDirectory("../templates/pages/home/router.ejs", `${project}/src/pages/home/router.js`)
    //         //写入login页面和login路由
    //         createDirectory("../templates/pages/login/login.ejs", `${project}/src/pages/login/Login.vue`)
    //         createDirectory("../templates/pages/login/router.ejs", `${project}/src/pages/login/router.js`)
    //         //写入app路由页面
    //         createDirectory("../templates/vue-app-router.ejs", `${project}/src/App.vue`)
    //         //安装vue-router依赖
    //         oraStart("Downloading vue-router...(正在下载vue-router...)");
    //         await commandSpawn(npmName, ...nodeProcessConfig.router);
    //         oraSucceed("vue-router download succeeded(vue-router下载成功))");
    //     } else if (item == "axios") {
    //         createDirectory("../templates/servers-config.ejs", `${project}/src/servers/config.js`)
    //         createDirectory("../templates/servers-request.ejs", `${project}/src/servers/request.js`)
    //         oraStart("Downloading axios...(正在下载axios...)");
    //         await commandSpawn(npmName, ...nodeProcessConfig.axios);
    //         oraSucceed("axios download succeeded(axios下载成功))");
    //     } else if (item == "Vuex") {
    //         deploy[item] = item
    //         createDirectory("../templates/vue-Vuex.ejs", `${project}/src/store/index.js`)
    //         oraStart("Downloading axios...(正在下载Vuex...)");
    //         await commandSpawn(npmName, ...nodeProcessConfig.Vuex);
    //         oraSucceed("axios download succeeded(Vuex下载成功))");
    //     } else if (item == "Pinia") {
    //         deploy[item] = item
    //         //在使用Pinia作为状态管理时，在默认的home和login页面添加store.js
    //         createDirectory("../templates/addPage/vue-pinia.ejs", `${project}/src/pages/home/store.js`, { name: "Home", lowerName: "home" })
    //         createDirectory("../templates/addPage/vue-pinia.ejs", `${project}/src/pages/login/store.js`, { name: "Login", lowerName: "login" })
    //         oraStart("Downloading Pinia...(正在下载Pinia...)");
    //         await commandSpawn(npmName, ...nodeProcessConfig.Pinia);
    //         oraSucceed("Pinia download succeeded(Pinia下载成功))");
    //     } else if (item == "Element_Plus") {
    //         deploy[item] = item
    //         oraStart("Downloading Element-Plus...(正在下载Element-Plus...)");
    //         await commandSpawn(npmName, ...nodeProcessConfig.Element_Plus);
    //         await commandSpawn(npmName, ...nodeProcessConfig.Element_Plus_Unit);
    //         //配置按需引入插件
    //         createDirectory("../templates/vue-webpack.common.ejs", `${project}/config/webpack.common.js`, { deploy })
    //         oraSucceed("Element-Plus download succeeded(Element-Plus下载成功))");
    //     } else if (item == "Dayjs") {
    //         oraStart("Downloading Dayjs...(正在下载Dayjs...)");
    //         await commandSpawn(npmName, ...nodeProcessConfig.Dayjs);
    //         oraSucceed("Dayjs download succeeded(Dayjs下载成功))");
    //     } else if (item == "Lodash") {
    //         oraStart("Downloading Lodash...(正在下载Lodash...)");
    //         await commandSpawn(npmName, ...nodeProcessConfig.Lodash);
    //         oraSucceed("Lodash download succeeded(Lodash下载成功))");
    //     } else if (item == "normalize.css") {
    //         deploy[item] = item
    //         oraStart("Downloading normalize.css...(正在下载normalize.css...)");
    //         await commandSpawn(npmName, ...nodeProcessConfig.Normalize);
    //         oraSucceed("normalize.css download succeeded(normalize.css下载成功))");
    //     }
    // })
    //排除不需要或者不能安装的依赖
    selectConfig = selectConfig.filter((item) => {
        return item !== "store" && item != "Vue"
    })
    work(selectConfig[0])
    async function work(item) {
        if (item == "router") {
            deploy[item] = item
            //写入router目录
            createDirectory("../templates/vue-router.ejs", `${project}/src/router/index.js`)
            //写入home页面和home路由
            createDirectory("../templates/pages/home/home.ejs", `${project}/src/pages/home/Home.vue`)
            createDirectory("../templates/pages/home/router.ejs", `${project}/src/pages/home/router.js`)
            //写入login页面和login路由
            createDirectory("../templates/pages/login/login.ejs", `${project}/src/pages/login/Login.vue`)
            createDirectory("../templates/pages/login/router.ejs", `${project}/src/pages/login/router.js`)
            //写入app路由页面
            createDirectory("../templates/vue-app-router.ejs", `${project}/src/App.vue`)
            //安装vue-router依赖
            oraStart("Downloading vue-router...(正在下载vue-router...)");
            await commandSpawn(npmName, ...nodeProcessConfig.router);
            oraSucceed("vue-router download succeeded(vue-router下载成功))");
            selectConfig.shift()
            work(selectConfig[0])
        } else if (item == "axios") {
            createDirectory("../templates/servers-config.ejs", `${project}/src/servers/config.js`)
            createDirectory("../templates/servers-request.ejs", `${project}/src/servers/request.js`)
            oraStart("Downloading axios...(正在下载axios...)");
            await commandSpawn(npmName, ...nodeProcessConfig.axios);
            oraSucceed("axios download succeeded(axios下载成功))");
            selectConfig.shift()
            work(selectConfig[0])
        } else if (item == "Vuex") {
            deploy[item] = item
            createDirectory("../templates/vue-Vuex.ejs", `${project}/src/store/index.js`)
            oraStart("Downloading axios...(正在下载Vuex...)");
            await commandSpawn(npmName, ...nodeProcessConfig.Vuex);
            oraSucceed("axios download succeeded(Vuex下载成功))");
            selectConfig.shift()
            work(selectConfig[0])
        } else if (item == "Pinia") {
            deploy[item] = item
            //在使用Pinia作为状态管理时，在默认的home和login页面添加store.js
            createDirectory("../templates/addPage/vue-pinia.ejs", `${project}/src/pages/home/store.js`, { name: "Home", lowerName: "home" })
            createDirectory("../templates/addPage/vue-pinia.ejs", `${project}/src/pages/login/store.js`, { name: "Login", lowerName: "login" })
            oraStart("Downloading Pinia...(正在下载Pinia...)");
            await commandSpawn(npmName, ...nodeProcessConfig.Pinia);
            oraSucceed("Pinia download succeeded(Pinia下载成功))");
            selectConfig.shift()
            work(selectConfig[0])
        } else if (item == "Element_Plus") {
            deploy[item] = item
            oraStart("Downloading Element-Plus...(正在下载Element-Plus...)");
            await commandSpawn(npmName, ...nodeProcessConfig.Element_Plus);
            await commandSpawn(npmName, ...nodeProcessConfig.Element_Plus_Unit);
            //配置按需引入插件
            createDirectory("../templates/vue-webpack.common.ejs", `${project}/config/webpack.common.js`, { deploy })
            oraSucceed("Element-Plus download succeeded(Element-Plus下载成功))");
            selectConfig.shift()
            work(selectConfig[0])
        } else if (item == "Dayjs") {
            oraStart("Downloading Dayjs...(正在下载Dayjs...)");
            await commandSpawn(npmName, ...nodeProcessConfig.Dayjs);
            oraSucceed("Dayjs download succeeded(Dayjs下载成功))");
            selectConfig.shift()
            work(selectConfig[0])
        } else if (item == "Lodash") {
            oraStart("Downloading Lodash...(正在下载Lodash...)");
            await commandSpawn(npmName, ...nodeProcessConfig.Lodash);
            oraSucceed("Lodash download succeeded(Lodash下载成功))");
            selectConfig.shift()
            work(selectConfig[0])
        } else if (item == "normalize_css") {
            deploy[item] = item
            oraStart("Downloading normalize.css...(正在下载normalize.css...)");
            await commandSpawn(npmName, ...nodeProcessConfig.Normalize);
            oraSucceed("normalize.css download succeeded(normalize.css下载成功))");
            selectConfig.shift()
            work(selectConfig[0])
        } else {
            createDirectory('../templates/vue-main.ejs', `${project}/src/main.js`, { deploy })
            oraStart("Running the project...(正在将项目跑起来...)");
            await commandSpawn(npmName, ...nodeProcessConfig.runServe);
        }
    }
    // createDirectory('../templates/vue-main.ejs', `${project}/src/main.js`, { deploy })
    // oraStart("Running the project...(正在将项目跑起来...)");
    // await commandSpawn(npmName, ...nodeProcessConfig.runServe);
};

//创建pages内子页面 
const createEjsPageAction = async (name) => {
    //先判断是创建组件还是页面，如果是页面页创建一个文件夹，如果是组件则直接创建文件
    //判断路径是否存在，不存在则创建文件夹，最后创建文件
    let tePath = path.resolve(program.opts().dest || "src/pages")
    let lowerName = name.toLocaleLowerCase()
    pathIsLie(tePath + `/${lowerName}`)
    createDirectory("../templates/addPage/vue-pinia.ejs", tePath + `/${name}/${lowerName}Store.js`, { name, lowerName })
    createDirectory("../templates/addPage/vue-component.ejs", tePath + `/${name}/${name}.vue`, { name, lowerName })
    createDirectory("../templates/addPage/vue-router-index.ejs", tePath + `/${name}/${lowerName}Router.js`, { name, lowerName })
}
module.exports = {
    createProjectAction,
    createEjsPageAction
};
