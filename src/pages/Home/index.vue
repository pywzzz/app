<template>
    <div>
        <!-- TypeNav是全局组件，所以不需要import -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <!-- v-for也可以在自定义的标签中去用 -->
        <!-- 这儿就利用v-for生成了两个floor -->
        <!-- 用v-for也是因为你mock的floor数据中有两个对象，所以对应两个floor组件，所以用v-for -->
        <!-- 这儿自定义的list属性是配合props实现父向子传参的效果，其值floor是v-for中的 -->
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
    name: "",
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    // 这里不在Floor组件中派发Floor的数据是因为，你mock的floor数据中有两个对象，意为有两个Floor组件分别获取一个数据
    // 在Floor组件中派发的效果就是，只有一个Floor组件，但是却对应了两份数据
    // 所以在Home组件中派发
    mounted() {
        this.$store.dispatch("getFloorList");
    },
    computed: {
        ...mapState({
            floorList: (state) => state.home.floorList,
        }),
    },
};
</script>

<style scoped></style>
