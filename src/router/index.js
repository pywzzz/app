import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由配置信息
import routes from "./routes";
// 引入store仓库
import store from "@/store";
// 使用插件
Vue.use(VueRouter);
// 配置路由
let router = new VueRouter({
    // kv一致省略v
    routes,
    // 这是vue的路由跳转时的滚动行为，
    scrollBehavior(to, from, savedPosition) {
        // 下面表示路由跳转到新页面后，新页面的滚动条在y轴的0处，即最上方。
        return { y: 0 };
    },
});

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 如果有token，即已登录
    if (token) {
        // 此时访 /login 或 /register 的话
        if (to.path == "/login" || to.path == "/register") {
            // 会跳转至 /home
            next("/home");
            // 如果访问其他地方
        } else {
            /* 这儿不一定非要用name，用userInfo里的nickName、loginName云都行，这儿
            就是为了解决87~88那儿ps的2中所述的问题 */
            /* 这里不用直接用userInfo而是用里面的些子数据是因为userInfo是个对象，对象
            无论空不空都是true，那儿这儿就没法if了 */
            // 如果有name，代表有userInfo了
            if (name) {
                // 直接放行
                next();
                // 如果没有name，代表没有获取到userInfo
            } else {
                try {
                    // 则去派发下actions来获取userInfo
                    await store.dispatch("getUserInfo");
                    // 然后放行
                    next();
                    // 只有token失效，try中的dispatch才会不成功，这时才会走catch
                } catch (error) {
                    // 这时直接用退出登录的actions即userLogout去把失效的token、userInfo啥的清掉
                    await store.dispatch("userLogout");
                    // 再放行到登录页面，供用户去登录
                    next("/login");
                }
            }
        }
        // 如果没有token，即未登录
    } else {
        // 则均放行
        next();
    }
});

export default router;
