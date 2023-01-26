const prompts = [
    [
        {
            "name": "features", // 选项名称
            "message": "What framework do you want to install?(你想创建的框架模板是什么?):", // 选项提示语
            "pageSize": 10,
            "type": "list", // 选项类型 另外还有 confirm list 等
            "choices": [ // 具体的选项
                {
                    "name": "Vue",
                    "value": "Vue",
                    "short": "Vue",
                    "description": "Install vue",
                },
            ]
        },
        {
            "name": "configure", // 选项名称
            "message": "What plug-in do you want to use?(你想使用的插件是什么?):", // 选项提示语
            "pageSize": 10,
            "type": "checkbox", // 选项类型 另外还有 confirm list 等
            "choices": [ // 具体的选项
                {
                    "name": "axios",
                    "value": "axios",
                    "short": "axios",
                    "description": "Install axios",
                    "checked": true
                },
                {
                    "name": "router",
                    "value": "router",
                    "short": "router",
                    "description": "Install router",
                    "checked": true
                },
                {
                    "name": "store",
                    "value": "store",
                    "short": "store",
                    "description": "Install store",
                    "checked": true
                },
            ]
        },

    ],
    [
        {
            "name": "store", // 选项名称
            "message": "你想使用的状态管理库是什么?(你想使用的状态管理库是什么？):", // 选项提示语
            "pageSize": 10,
            "type": "list", // 选项类型 另外还有 confirm list 等
            "choices": [ // 具体的选项
                {
                    "name": "Vuex",
                    "value": "Vuex",
                    "short": "Vuex",
                    "description": "Install Vuex",
                },
                {
                    "name": "Pinia",
                    "value": "Pinia",
                    "short": "Pinia",
                    "description": "Install Pinia",
                },
            ]
        },
    ],
    [

    ]

]
const cdnPrompts =
{
    "name": "tool", // 选项名称
    "message": "What tools do you want to use?(你想使用的工具是什么？):", // 选项提示语
    "pageSize": 10,
    "type": "checkbox", // 选项类型 另外还有 confirm list 等
    "choices": [ // 具体的选项
        {
            "name": "Element_Plus",
            "value": "Element_Plus",
            "short": "Element_Plus",
            "description": "Install Element_Plus",
            "checked": true
        },
        {
            "name": "Dayjs",
            "value": "Dayjs",
            "short": "Dayjs",
            "description": "Install Dayjs",
            "checked": true
        },
        {
            "name": "Lodash",
            "value": "Lodash",
            "short": "Lodash",
            "description": "Install Lodash",
            "checked": true
        },
        {
            "name": "normalize_css",
            "value": "normalize_css",
            "short": "normalize_css",
            "description": "Install normalize_css",
            "checked": true
        },

    ]
}
function toolCdn(item) {
    return {
        "name": "toolCdn", // 选项名称
        "message": "哪些工具你希望使用CDN?(哪些工具你希望使用CDN?):", // 选项提示语
        "pageSize": 10,
        "type": "checkbox", // 选项类型 另外还有 confirm list 等
        "choices": item
    }
}
module.exports = {
    prompts,
    cdnPrompts,
    toolCdn
}