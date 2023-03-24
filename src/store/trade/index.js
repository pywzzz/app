import { reqAddressInfo, reqOrderInfo } from "@/api";
// 仓库存数据的地方
const state = {
    address: [],
    orderInfo: {},
};
// 修改state的唯一地方
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
};
// 书写业务逻辑，处理异步云
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit("GETUSERADDRESS", result.data);
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit("GETORDERINFO", result.data);
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
