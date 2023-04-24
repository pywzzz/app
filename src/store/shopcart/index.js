import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
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
    // 删除购物车中的产品
    // 这儿也是就改个服务器数据库，不需要服务器返回数据
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    // 修改购物车中产品的那个“选中”按钮勾还是不勾
    // 这儿也是就改个服务器数据库，不需要服务器返回数据
    async updateCheckedBySkuId({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    // 这儿的“删除选中的商品”是借助上面的deleteCartListBySkuId弄的
    // 先把context中的dispatch和getters解构出来
    deleteAllCheckedCart({ dispatch, state }) {
        let PromiseAll = [];
        state.cartList.forEach((item) => {
            // 下面的这个 "" 表示什么都不做
            let promise =
                item.isChecked == 1
                    ? dispatch("deleteCartListBySkuId", item.skuId)
                    : "";
            // 把得到的每个promise放到PromiseAll这个数组中
            PromiseAll.push(promise);
        });
        // 只有PromiseAll中的数组都为真时，Promise.all才返回true
        /* 当Promise.all返回true时，说明当中存的每个promise都返回true，即上面的每一个dispatch都
        成功了，从而呼应ShopCart组件那儿的deleteAllCheckedCart中的await云 */
        return Promise.all(PromiseAll);
    },
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = [];
        // 这儿的cartList[0]是因为人数据库设计的是cartList是个数组，然后信息都在第0个元素中
        state.cartList.forEach((item) => {
            let promise = dispatch("updateCheckedBySkuId", {
                skuId: item.skuId,
                isChecked,
            });
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
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
