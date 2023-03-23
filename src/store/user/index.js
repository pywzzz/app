import { reqGetCode, reqUserRegister } from "@/api";
// 仓库存数据的地方
const state = {
    code: "",
};
// 修改state的唯一地方
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
};
// 书写业务逻辑，处理异步云
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("fail"));
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
