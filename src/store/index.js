import Vue from "vue";
import Vuex from "vuex";
// 使用vuex插件
Vue.use(Vuex);

// 引入各个小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";

// 对外暴露Store类的一个实例对象
export default new Vuex.Store({
    // 实现Vuex仓库的模块化开发来存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
    },
});
