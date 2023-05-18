// 这里对api进行统一管理
// 如果项目较小的话则可配合生命周期钩子加上axios的get方法去获取数据
// 但假如项目很大，比如有100个模块，它们又连了同一个接口a，若接口a地址变的话，那如果没有统一管理就要逐个修改了，改100次
import requests from "./request";

// 别的组件拿到（所以要暴露下）reqCategoryList这个箭头函数，调用后其函数体一执行就可以发请求了
//这儿的url应该是/api/product/getBaseCategoryList，但因为你在request.js配置了baseURL，所以不用写了就
//这儿已知/api/product/getBaseCategoryList这个接口是get请求，且无参数
//这儿axios发请求，return的是一个Promise对象
export const reqCategoryList = () =>
    requests({ url: "/product/getBaseCategoryList", method: "get" });

// 获取Search模块的相关数据
// 这儿用data属性去接收参数
// 使用reqGetSearchInfo这个函数时，它的形参params，至少是一个空对象，即 {} ，否则此次请求是会失败的
// 如你用postman的k为params，当v为 {} 人返回了1即成功，当v为空时，返回的是请求失败相关云
export const reqGetSearchInfo = (params) =>
    requests({ url: "/list", method: "post", data: params });

// 获取Detail组件的相关数据
// 获取的形参skuId是params参数，接收后向相应的url请求数据
export const reqGoodsInfo = (skuId) =>
    requests({ url: `/admin/product/getSkuById/${skuId}`, method: "get" });

// 将产品添加到购物车期间所需要的数据
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
    requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车的相关数据
export const reqCartList = () =>
    requests({ url: `/cart/cartList`, method: "get" });

//用于删除购物车中产品的接口
export const reqDeleteCartById = (skuId) =>
    requests({ url: `/cart/deleteCart/${skuId}`, method: "put" });

// 用于修改购物车中产品的那个“选中”按钮勾还是不勾的接口
export const reqUpdateCheckedById = (skuId, isChecked) =>
    requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "put" });

// 用于获取在结算界面用到的用户地址信息
export const reqAddressInfo = () =>
    requests({
        url: "/user/userAddress/auth/findUserAddressList",
        method: "get",
    });

// 用于获取在结算界面用到的商品列表
export const reqOrderInfo = () =>
    requests({ url: "/order/auth/trade", method: "get" });

// 用于结算界面提交订单后给服务器传相关数据
export const reqSubmitOrder = (data) =>
    requests({
        url: "/order/auth/submitOrder",
        data,
        method: "post",
    });

// 拿着订单号获取支付信息
export const reqPayInfo = (orderId) =>
    requests({ url: `payment/weixin/createNative/${orderId}`, method: "get" });

// 获取订单的支付状态
export const reqPayStatus = (orderId) =>
    requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: "get",
    });

// 获取验证码
export const reqGetCode = (phone) =>
    requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 用户注册
export const reqUserRegister = (data) =>
    requests({ url: "/user/passport/register", data, method: "post" });

// 用户登录
export const reqUserLogin = (data) =>
    requests({ url: "/admin/acl/index/login", data, method: "post" });

// 带着登录时得到的token获取用户信息
// token这个参数通过请求头传入，而不是在这儿传入
export const reqUserInfo = () =>
    requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录
export const reqLogout = () =>
    requests({ url: "/admin/acl/index/logout", method: "post" });

// 获取个人中心那儿的“我的订单”那儿的数据
export const reqMyOrderList = (page, limit) =>
    requests({ url: `/order/auth/${page}/${limit}`, method: "get" });

// 获取banner数据
export const reqGetBannerList = () =>
    requests({ url: "/banner", method: "get" });

// 获取floor数据
export const reqFloorList = () => requests({ url: "/floor", method: "get" });

// 验证token是否有效
export const reqValidateToken = () =>
    requests({ url: "/user/validateToken", method: "get" });

// 添加用户地址
export const reqAddAddressInfo = (address) =>
    requests({
        url: "/user/userAddress/auth/addUserAddress",
        method: "post",
        data: address,
    });

// 更新用户地址
export const reqUpdateAddressInfo = (addressInfo) =>
    requests({
        url: "/user/userAddress/auth/updateUserAddress",
        method: "put",
        data: addressInfo,
    });

// 逻辑删除用户地址
export const reqDeleteAddressInfo = (addressId) =>
    requests({
        url: `/user/userAddress/auth/logicalDeleteUserAddress/${addressId}`,
        method: "put",
    });

// 改变用户默认地址
export const reqChangeDefaultAddressInfo = (userId, addressId) =>
    requests({
        url: `/user/userAddress/auth/changeDefaultUserAddress/${userId}/${addressId}`,
        method: "put",
    });
