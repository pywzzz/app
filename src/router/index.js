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
        {
            path: "/home",
            component: Home,
        },
        {
            path: "/search",
            component: Search,
        },
        {
            path: "/register",
            component: Register,
        },
        {
            path: "/login",
            component: Login,
        },
        //path的*即访问/，也即项目第一次启动，让其重定向到Home组件，即首页
        {
            path:"*",
            redirect:"/home"
        }
    ],
});
