import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "@/router";
// 引入仓库
import store from "@/store";
// 下面两行将三级联动组件注册为全局组件
import TypeNav from "@/components/TypeNav";
// 下面两行将轮播图部分注册成组件且，为个全局的组件
import Carousel from "@/components/Carousel";
import { MessageBox, Pagination } from "element-ui";
// 第一个参数是全局组件的名字，第二个是标明哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 这种是直接挂在原形上的映入方式
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 直接在这儿引入，因为有不止一个组件（至少目前ListContainer和Floor都要用）要用这东西，所以别在组件内引了
// 这儿import的是样式，样式没有暴露，所以和上面的mock一样直接import就行了
import "swiper/css/swiper.css";
// 引入图片懒加载插件及一张图片
import VueLazyload from "vue-lazyload";
import lazy from "@/assets/lazy.jpg";
// 引入用于表单验证的插件
import "@/plugins/validate";
// 统一引入接口
import * as API from "@/api";

Vue.use(VueLazyload, {
    loading: lazy,
});

Vue.config.productionTip = false;
new Vue({
    render: (h) => h(App),
    // 配置全局事件总线
    // 这儿主要用于Search和Header这两个兄弟组件的通信
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    //es6的kv一致省略v的写法
    // 引入router这个新的配置项
    router,
    // 注册仓库
    store,
}).$mount("#app");
