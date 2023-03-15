<template>
    <div>
        <Hearder></Hearder>
        <!-- 路由组件出口的地方位置 -->
        <router-view></router-view>
        <Footer></Footer>
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
