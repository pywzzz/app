import { reqGoodsInfo, reqGetBannerList, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";
// 仓库存数据的地方
const state = {
    // 人的设计的数据的格式是个对象，所以这儿初始值应是个对象
    goodsInfo: {},
    /* 用uuid_token这东西来标识actions的addOrUpdateShopCart中传的skuId和skuNum属于
    哪个用户，从而在后来用户从数据库中可以取到自己的那个skuId和skuNum */
    uuid_token: getUUID(),
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
    // 用于加入购物车的这种操作或者，加入购物车后修改产品个数的这种操作
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        /* 这里，你给人发的skuId，skuNum，是用户输入的，人服务器只需要接收，然后存下来就完事儿了，所以服务器
        只会返回存成功或存失败的消息，不会返回一些像之前弄的，返回商品信息啥的数据云 */
        // 所以这儿也不用在mutations里写东西了，因为没返回具体数据
        if (result.code == 200) {
            // 存成功的话给你返回个 ok
            return "ok";
        } else {
            // 存失败的话给你返回个 Promise.reject(new Error("fail"))
            return Promise.reject(new Error("fail"));
        }
    },
};
// 功能类似计算属性，用于少些写东西
const getters = {
    // getters中函数的state就是本仓库的state
    skuInfo(state) {
        // 这儿加个 || {} 的原因类比search仓库那儿的(不同之处就是search那儿的是数组，所以 || [] )undefined什么的
        return state.goodsInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || [];
    },
    skuImageList(state) {
        return state.goodsInfo.skuImageList || [];
    },
};

// 对外暴露Store类的一个实例对象
export default {
    state,
    mutations,
    actions,
    getters,
};
