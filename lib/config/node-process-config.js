
function nodeProcessConfig(cwdDefault = { cwd: process.cwd() }) {
    return {
        "runInstall": [
            ["install"],
            cwdDefault
        ],
        "runServe": [
            ["run", "serve"],
            cwdDefault
        ],
        "router": [
            ["install", "vue-router@4"],
            cwdDefault
        ],
        "Vuex": [
            ["install", "vuex@next"],
            cwdDefault
        ],
        "Pinia": [
            ["install", "pinia"],
            cwdDefault
        ],
        "axios": [
            ["install", "axios"],
            cwdDefault
        ],
        "Element_Plus": [
            ["install", "element-plus", "--save"],
            cwdDefault
        ],
        "Element_Plus_Unit": [
            ["install", "unplugin-vue-components", "unplugin-auto-import", "-D"],
            cwdDefault
        ],
        "Dayjs": [
            ["install", "dayjs"],
            cwdDefault
        ],
        "Lodash": [
            ["install", "lodash"],
            cwdDefault
        ],
        "Normalize": [
            ["install", "normalize.css"],
            cwdDefault
        ]
    }
}
module.exports = nodeProcessConfig

