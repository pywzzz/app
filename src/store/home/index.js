import { reqCategoryList } from "@/api";
// 仓库存数据的地方
const state = {
    // 因为服务器返回的数据是数组，所以相对应地，这儿的初始值也应为数组
    categoryList: [],
};
// 修改state的唯一地方
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
};
// 书写业务逻辑，处理异步云
const actions = {
    //通过API中的接口函数调用，向服务发送请求获取服务器的数据
    // async和await是同时存在的
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
};
// 功能类似计算属性，用于少些写东西
const getters = {};

// 对外暴露Store类的一个实例对象
export default {
    state,
    mutations,
    actions,
    getters,
};
