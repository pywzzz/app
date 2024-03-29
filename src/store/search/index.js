import { reqGetSearchInfo } from "@/api";
// 仓库存数据的地方
const state = {
    // 已知数据格式是对象，所以这儿你的初始值也应是对象
    searchList: {},
};
// 修改state的唯一地方
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};
// 书写业务逻辑，处理异步云
const actions = {
    /* 哦懂了，actions里面的东西不都有两个参数么，第一个是context，第二个是收到的数据，当使用commit时，一般的
    写法是，第一个参数的形参是context，然后去 context.commit 来调用commit。而这儿是用 { commit } 去解构赋
    值，直接“提取”出commit，然后下面就直接使用 commit 了，不用什么context了就 */
    // 这儿给收到的数据params直接赋一个默认的值 {} ，以免出现用户忘输参数，即参数为空，导致的请求失败云
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    },
};
// 功能类似计算属性，用于少些写东西
const getters = {
    goodsList(state) {
        /* 这儿在后面加了个 || [] 是因为，如果网络不好的话，则state.searchList，按你在上面的state中写的，它的值
        就应该是 {} ，那这时，你在 {} 去 .goodsList 的话，那goodsList的值就是个undefined了，那一会儿人拿着
        这个undefined去弄些v-for什么的，不就乱了，所以这儿得，加个 || []  */
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    },
};

// 对外暴露Store类的一个实例对象
export default {
    state,
    mutations,
    actions,
    getters,
};
