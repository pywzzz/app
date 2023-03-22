// 引入uuid这个包
import { v4 as uuidv4 } from "uuid";
export const getUUID = () => {
    // 获取当前uuid_token，如果没有那就是false，之后会呼应下方的if
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    // 这个if可以保证uuid_token如果没有，则获取一个，获取后就一直是这个uuid_token，不变
    // 用的单例模式的思想云
    if (!uuid_token) {
        uuid_token = uuidv4();
        // uuid_token要持久化存，所以使用本地存储
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    return uuid_token;
};
