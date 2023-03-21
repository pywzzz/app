import { reqGoodsInfo } from "@/api";
// 仓库存数据的地方
const state = {
    // 人的设计的数据的格式是个对象，所以这儿初始值应是个对象
    goodsInfo: {},
};
// 修改state的唯一地方
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    },
};
// 书写业务逻辑，处理异步云
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODSINFO", result.data);
        }
    },
};
// 功能类似计算属性，用于少些写东西
const getters = {
    // getters中函数的state就是本仓库的state
    categoryView(state) {
        // 这儿加个 || {} 的原因类比search仓库那儿的(不同之处就是search那儿的是数组，所以 || [] )undefined什么的
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
};

// 对外暴露Store类的一个实例对象
export default {
    state,
    mutations,
    actions,
    getters,
};
