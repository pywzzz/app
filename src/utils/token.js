import { reqValidateToken } from "@/api";

export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
};
export const getToken = () => {
    return localStorage.getItem("TOKEN");
};
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
};
export const isTokenExpired = async (token) => {
    // 如果token过期，返回true，否则返回false
    let result = await reqValidateToken();
    if (result.code == 201) {
        return true;
    } else {
        return false;
    }
};
