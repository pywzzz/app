import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由配置信息
import routes from "./routes";
// 使用插件
Vue.use(VueRouter);
// 配置路由
export default new VueRouter({
    // kv一致省略v
    routes,
    // 这是vue的路由跳转时的滚动行为，
    scrollBehavior(to, from, savedPosition) {
        // 下面表示路由跳转到新页面后，新页面的滚动条在y轴的0处，即最上方。
        return { y: 0 };
    },
});
