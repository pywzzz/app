import { reqCartList } from "@/api";
// 仓库存数据的地方
const state = {
    cartList: [],
};
// 修改state的唯一地方
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    },
};
// 书写业务逻辑，处理异步云
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
};
// 功能类似计算属性，用于少些写东西
const getters = {
    cartList(state) {
        // 这儿 || 的是个 {} 是因为，算了你自己看人返回的数据格式就知道了
        return state.cartList[0] || {};
    },
};

// 对外暴露Store类的一个实例对象
export default {
    state,
    mutations,
    actions,
    getters,
};
