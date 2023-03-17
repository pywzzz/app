// 引入mockjs插件开始模拟数据
// Mock记得大写，因为它是个对象
import Mock from "mockjs";
// 引入JSON格式的数据
// 在webpack中，图片、JSON资源这些资源是默认对外暴露的，直接import就行了
import banner from "./banner.json";
import floor from "./floor.json";

// mock是Mock对象中的一个方法，第一个参数是请求数据的地址，第二个是请求的数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
