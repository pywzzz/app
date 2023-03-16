import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "@/router";
// 引入仓库
import store from "@/store";
// 下面两行将三级联动组件注册为全局组件
import TypeNav from "@/components/TypeNav";
// 第一个参数是全局组件的名字，第二个是标明哪一个组件
Vue.component(TypeNav.name, TypeNav);

Vue.config.productionTip = false;



new Vue({
    render: (h) => h(App),
    //es6的kv一致省略v的写法
    // 引入router这个新的配置项
    router,
    // 注册仓库
    store,
}).$mount("#app");
