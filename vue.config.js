const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
});

module.exports = {
    // 让npm在build时不在js文件夹下生成map文件
    productionSourceMap: false,
    // 关闭eslint
    lintOnSave: false,
    // 配置代理跨域
    // 服务器之间是没跨域问题的，仅浏览器有
    devServer: {
        proxy: {
            // 这儿的/api是请求前缀，意为代理服务器如果看到你的请求地址中出现/api这个前缀的话就知道此次请求应转发至target中的地址
            // 前缀的“前”是忽略了协议、主机名、端口号的“前”
            // 可以简单理为端口号后就是“前缀”了，如 localhost:8080/qianzhui
            // 也如这儿的 gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
            "/api": {
                /* 这儿不用写pathRewrite了，因为你请求的是 gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList ，
                它里面本来就有个/api，人本来就需要，故 */
                target: "http://gmall-h5-api.atguigu.cn",
            },
        },
    },
};
