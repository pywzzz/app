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
};
</script>

<style scoped></style>
