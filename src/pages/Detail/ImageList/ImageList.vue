<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div
                class="swiper-slide"
                v-for="(slide, index) in skuImageList"
                :key="slide.id"
            >
            <!-- 用currentIndex这个数据控制active样式 -->
                <img
                    :src="slide.imgUrl"
                    :class="{ active: currentIndex == index }"
                    @click="changeCurrentIndex(index)"
                />
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "ImageList",
    // 接收父组件Detail传的数据
    props: ["skuImageList"],
    data() {
        return {
            currentIndex: 0,
        };
    },
    methods: {
        changeCurrentIndex(index) {
            this.currentIndex = index;
            // 向兄弟组件Zoom传叫getIndex的数据，它表示用户点的第几张图
            this.$bus.$emit("getIndex", this.currentIndex);
        },
    },
    watch: {
        // 下面是弄轮播图相关
        skuImageList() {
            this.$nextTick(() => {
                new Swiper(this.$refs.cur, {
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    // 轮播图那个框中显示
                    slidesPerView: 3,
                    // 点击一下轮播图会出来几个新的图
                    slidesPerGroup: 1,
                });
            });
        },
    },
};
</script>

<style lang="less" scoped>
.swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
        width: 56px;
        height: 56px;

        img {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            padding: 2px;
            width: 50px;
            height: 50px;
            display: block;

            &.active {
                border: 2px solid #f60;
                padding: 1px;
            }
        }
    }

    .swiper-button-next {
        left: auto;
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
        right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;
        &::after {
            font-size: 12px;
        }
    }
}
</style>
