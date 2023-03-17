// 复制粘贴的request.js，只修改了注释的地方
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
    // 因为在mockServe.js中的路径 /mock/banner 就是以 /mock 开头的
    baseURL: "/mock",
    timeout: 5000,
});

requests.interceptors.request.use((config) => {
    nprogress.start();
    return config;
});

requests.interceptors.response.use(
    (res) => {
        nprogress.done();
        return res.data;
    },
    (err) => {
        return Promise.reject(new Error("faile"));
    }
);

export default requests;
