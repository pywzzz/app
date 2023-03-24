// 这里对api进行统一管理
// 如果项目较小的话则可配合生命周期钩子加上axios的get方法去获取数据
// 但假如项目很大，比如有100个模块，它们又连了同一个接口a，若接口a地址变的话，那如果没有统一管理就要逐个修改了，改100次
import requests from "./request";

// 引入这个mock接口
import mockRequests from "./mockRequest";

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
    requests({ url: `/item/${skuId}`, method: "get" });

// 将产品添加到购物车期间所需要的数据
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
    requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车的相关数据
export const reqCartList = () =>
    requests({ url: `/cart/cartList`, method: "get" });

//用于删除购物车中产品的接口
export const reqDeleteCartById = (skuId) =>
    requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 用于修改购物车中产品的那个“选中”按钮勾还是不勾的接口
export const reqUpdateCheckedById = (skuId, isChecked) =>
    requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

// 用于获取在结算界面用到的用户地址信息
export const reqAddressInfo = () =>
    requests({
        url: "/user/userAddress/auth/findUserAddressList",
        method: "get",
    });

// 用于获取在结算界面用到的商品列表
export const reqOrderInfo = () =>
    requests({ url: "/order/auth/trade", method: "get" });

// 获取验证码
export const reqGetCode = (phone) =>
    requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 用户注册
export const reqUserRegister = (data) =>
    requests({ url: "/user/passport/register", data, method: "post" });

// 用户登录
export const reqUserLogin = (data) =>
    requests({ url: "/user/passport/login", data, method: "post" });

// 带着登录时得到的token获取用户信息
// token这个参数通过请求头传入，而不是在这儿传入
export const reqUserInfo = () =>
    requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

// 退出登录
export const reqLogout = () =>
    requests({ url: "/user/passport/logout", method: "get" });

// 拿到banner
export const reqGetBannerList = () => mockRequests.get("/banner");

// 下面是上面代码完整的写法
/* export const reqCategoryList = () => {
    return requests({ url: "/product/getBaseCategoryList", method: "get" });
}; */

// 获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");
