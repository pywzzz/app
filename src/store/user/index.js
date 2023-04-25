import {
    reqGetCode,
    reqLogout,
    reqUserInfo,
    reqUserLogin,
    reqUserRegister,
} from "@/api";
import { getToken, removeToken, setToken } from "@/utils/token";
// 仓库存数据的地方
const state = {
    // vuex的数据不是持久化存储
    /* 一开始本地没有token，所以这儿getToken没用，token还是null，但是你登录后，在userLogin中
    的setToken就可以将其存到本地，这时候getToken就能拿到token了。这时你再刷新页面的话，也是
    可以通过getToken拿到token的，从而避免了vuex的非持久化存储 */
    token: getToken(),
    userInfo: {},
};
// 修改state的唯一地方
const mutations = {
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        // 把仓库中的数据清除
        state.token = "";
        state.userInfo = {};
        // 将本地存储的token清除
        removeToken();
    },
};
// 书写业务逻辑，处理异步云
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
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
    // 拿着token去获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    // 用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            // 持久化存储token
            setToken(result.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("CLEAR");
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
