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

// 拿到banner
export const reqGetBannerList = () => mockRequests.get("/banner");

// 下面是上面代码完整的写法
/* export const reqCategoryList = () => {
    return requests({ url: "/product/getBaseCategoryList", method: "get" });
}; */

// 获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");
