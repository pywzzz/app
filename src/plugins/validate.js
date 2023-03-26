import Vue from "vue";
// 引入vee-validate插件用于表单验证相关
import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

// 默认的提示信息是英文，第一个参数将其改为中文
VeeValidate.Validator.localize("zh_CN", {
    messages: {
        // 将消息提示改成中文
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`,
    },
    // 需要验证的东西
    attributes: {
        phone: "手机号",
        code: "验证码",
        password: "密码",
        rePassword: "确认密码",
        agree: "同意",
    },
});
// 自定义校验规则。第一个参数是自定义的名字
VeeValidate.Validator.extend("agree", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
});
