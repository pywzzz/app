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
});
