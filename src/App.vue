<template>
    <div>
        <Hearder></Hearder>
        <!-- 路由组件出口的地方位置 -->
        <router-view></router-view>
        <!-- 实现路由到Login、Register组件时不显示Footer组件 -->
        <!-- 这儿不用v-if，因为它会实际操作DOM，性能不好 -->
        <Footer v-show="$route.meta.isShow"></Footer>
    </div>
</template>

<script>
import Hearder from "./components/Header";
import Footer from "./components/Footer";
export default {
    name: "App",
    components: {
        Hearder,
        Footer,
    },
    mounted() {
        // 通知vuex发请求获取数据并将其存到TypeNav所在的其中一个组件，Home，的仓库中去
        // 写在TypeNav的话，因为TypeNav组件会在如从Home切换到Search时销毁、生成，从而会向服务器请求很多次数据
        // 而App只生成一次，所以就请求一次，性能好
        this.$store.dispatch("categoryList");
    },
};
</script>

<style scoped></style>
