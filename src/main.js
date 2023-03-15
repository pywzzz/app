import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "@/router";

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    //es6的kv一致省略v的写法
    // 引入router这个新的配置项
    router,
}).$mount("#app");
