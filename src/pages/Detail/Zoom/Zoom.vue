<template>
    <div class="spec-preview">
        <!-- 这个是轮播图框中的图 -->
        <!-- 默认展示第一张，故 skuImageList[0] -->
        <img :src="imgObj.imgUrl" />
        <div class="event" @mousemove="handler"></div>
        <div class="big">
            <!-- 这个是利用big样式实现的放大镜放大后，展示的图 -->
            <!-- 默认展示第一张，故 skuImageList[0]  -->
            <img :src="imgObj.imgUrl" ref="big" />
        </div>
        <!-- 放大镜的那个遮罩层 -->
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
    name: "Zoom",
    // 收到父组件Detail传来的参数
    props: ["skuImageList"],
    data() {
        return {
            // 0代表第一张轮播图的缩略图有active样式，即高亮
            currentIndex: 0,
        };
    },
    computed: {
        imgObj() {
            // 这儿也是类比search仓库之解决因为undefined导致的报红
            // 默认展示第一张，即skuImageList[0]，这儿的this.currentIndex默认值你弄的也是0
            return this.skuImageList[this.currentIndex] || {};
        },
    },
    methods: {
        handler(event) {
            let mask = this.$refs.mask;
            let big = this.$refs.big;
            let left = event.offsetX - mask.offsetWidth / 2;
            let top = event.offsetY - mask.offsetHeight / 2;
            // 约束遮罩层的范围
            if (left <= 0) {
                left = 0;
            } else if (left >= mask.offsetWidth) {
                left = mask.offsetWidth;
            } else if (top <= 0) {
                top = 0;
            } else if (top >= mask.offsetHeight) {
                top = mask.offsetHeight;
            }
            // 这儿赋值时别忘了加 "px" 这东西
            mask.style.left = left + "px";
            mask.style.top = top + "px";
            // 这儿的乘2是因为你下面的css中的.big下的img弄的是200%，所以这儿应该乘2
            // 这的负号是因为你移动的是图片，你向左移动，对于图片就是向右，所以是负号
            big.style.left = -2 * left + "px";
            big.style.top = -2 * top + "px";
        },
    },
    mounted() {
        // 接收兄弟组件ImageList传过来的数据getIndex数据，它表示用户点击的第几张图
        this.$bus.$on("getIndex", (index) => {
            this.currentIndex = index;
        });
    },
};
</script>

<style lang="less">
.spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        display: none;
        background: white;

        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
        display: block;
    }
}
</style>
