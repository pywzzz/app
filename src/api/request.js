// 二次封装axios就是为了使用它的请求和响应拦截器
import axios from "axios";
import { config } from "vue/types/umd";

/* requests是axios的实例对象
创建一个实例对象的好处就是可以对axios进行一些配置 */
const requests = axios.create({
    /* 下面一行会在你发送请求时自动给你加个/api
    因为对接口的路径一般都有/api
    如接口为/api/aaa，则你访问时候应是 localhost:8080/api/aaa
    但这时你配置过后只需 localhost:8080/aaa 即可 */
    baseURL: "/api",
    // 请求超时为5000ms
    timeout: 5000,
});

//这是请求拦截器。在发送请求之前，它可以对其进行检测，从而在请求被发送前做些事
requests.interceptors.request.use((config) => {
    // 这个config是拦截器的一个配置对象，它的一个叫headers的属性可以让我们拿到请求头
    return config;
});

//这是响应拦截器
requests.interceptors.response.use(
    // 第一个是成功时的回调函数，返回服务器响应的数据
    (res) => {
        return res.data;
    },
    // 第二个是失败时的回调函数
    (err) => {
        //返回下面的东西（这儿return啥都行）
        return Promise.reject(new Error("faile"));
    }
);
