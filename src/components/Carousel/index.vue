<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <!-- 弄成组件的话，即v-for的list这数据就需要从外部传，所以又在下面弄了个props用于接收 -->
            <div
                class="swiper-slide"
                v-for="carousel in list"
                :key="carousel.id"
            >
                <img
                    :src="'http://localhost:8888/api' + carousel.imgUrl"
                />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "Carousel",
    props: ["list"],
    // 利用watch监测list这个要在轮播图中用到的数据是否在相应的store中准备好
    watch: {
        // ----------------------------
        // 下面这些是ListContainer中的注释
        // ----------------------------
        /* bannerList: {
        // bannerList一发生改变，就执handler中的函数
        handler(newValue, oldValue) {
            // $nextTick的参数是个回调函数，这个回调函数会在dom节点更新完毕后再执行
            this.$nextTick(() => {
                var mySwiper = new Swiper(
                    document.querySelector(".swiper-container"),
                    {
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination",
                            // true时，就可以通过点击轮播图下面的小点来控制轮播图的跳转
                            clickable: true,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-next",
                        },
                    }
                    ;
            });
        },
    },

    // 这儿只是为了迎合全局组件Carousel才弄的，不写这东西功能是照旧的
    immediate: true,

    //这儿是简写形式，上方是完整形式
    bannerList() {
        // $nextTick的参数是个回调函数，这个回调函数会在dom节点更新完毕后再执行
        this.$nextTick(() => {
            // 用ref获取dom
            new Swiper(this.$refs.mySwiper, {
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    // true时，就可以通过点击轮播图下面的小点来控制轮播图的跳转
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-next",
                },
            });
        });
    }, */
        // ----------------------
        // ListContainer的注释结束
        // ----------------------
        // ------------------------
        // 下面注释原本是Floor组件中的
        // ------------------------
        list: {
            // list这个数据是父组件Home给的，这种一开始就有的东西，没有变化，所以不添加immediate的话是watch不到的
            // immediate表示上去就监听一下
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    // 用ref获取dom
                    new Swiper(this.$refs.cur, {
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination",
                            // true时，就可以通过点击轮播图下面的小点来控制轮播图的跳转
                            clickable: true,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-next",
                        },
                    });
                });
            },
        },
        // --------------
        // Floor的注释结束
        // --------------
    },
};
</script>

<style lang="" scoped></style>
