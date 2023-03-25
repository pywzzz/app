// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
// 引入二级路由组件
import Myorder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";
// 路由配置信息
export default [
    // 如果path是xxx，则呈现component中写的组件
    /* 这儿的path、component、meta云都是配置对象，是人设计的，你在这儿瞎写的不会生效
    如瞎写个 test: XXX 则在$route上也是没有test属性的 */
    {
        path: "/home",
        component: Home,
        meta: { isShow: true },
    },
    {
        path: "/center",
        component: Center,
        meta: { isShow: true },
        // 访问 /center 会重定向到 /center/myorder
        redirect: "/center/myorder",
        // 二级路由
        children: [
            {
                path: "myorder",
                component: Myorder,
            },
            {
                path: "grouporder",
                component: GroupOrder,
            },
        ],
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
        // 从Search跳转到相应的Detail要提供skuid这个params参数
        path: "/detail/:skuid",
        component: Detail,
        meta: { isShow: true },
    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: { isShow: true },
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { isShow: true },
    },
    {
        path: "/trade",
        component: Trade,
        meta: { isShow: false },
        // 路由独享守卫只负责，路由跳转至如这儿的 /trade 时的情况，即只对自己负责
        beforeEnter: (to, from, next) => {
            // 正常情况下进入 /trade 的上一个页面是 /shopcart
            if (from.path == "/shopcart") {
                // 放行
                next();
                // 如果不是从 /shopcart 这地方去路由跳转到 /trade 的话
            } else {
                // 表示停留在当前页面不跳转，同时url也自动变为 from 这个参的值
                next(false);
            }
        },
    },
    {
        path: "/pay",
        component: Pay,
        meta: { isShow: false },
        beforeEnter: (to, from, next) => {
            // 正常情况下进入 /pay 的上一个页面是 /trade
            if (from.path == "/trade") {
                // 放行
                next();
                // 如果不是从 /trade 这地方去路由跳转到 /pay 的话
            } else {
                // 表示停留在当前页面不跳转，同时url也自动变为 from 这个参的值
                next(false);
            }
        },
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { isShow: false },
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
];
