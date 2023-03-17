import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
// 配置路由
export default new VueRouter({
    routes: [
        // 如果path是xxx，则呈现component中写的组件
        /* 这儿的path、component、meta云都是配置对象，是人设计的，你在这儿瞎写的不会生效
        如瞎写个 test: XXX 则在$route上也是没有test属性的 */
        {
            path: "/home",
            component: Home,
            meta: { isShow: true },
        },
        {
            name: "search",
            // 占位以收集param参数
            // 末尾的 ? 表示param参数可传可不传
            /* 即如果你不加的话，当你访 localhost:8080/#/home/search?canshu=444 ，因为你没有传param参数，
            所以实际的地址栏上会显示 localhost:8080/#/home/?canshu=444 ，且你的路由也并不会跳转 */
            path: "/search/:keyword?",
            component: Search,
            meta: { isShow: true },
        },
        {
            path: "/register",
            component: Register,
            meta: { isShow: false },
        },
        {
            path: "/login",
            component: Login,
            meta: { isShow: false },
        },
        //path的*即访问/，也即项目第一次启动，让其重定向到Home组件，即首页
        {
            path: "*",
            redirect: "/home",
        },
    ],
});
