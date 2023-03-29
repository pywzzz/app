<template>
    <div class="floor">
        <div class="py-container">
            <div class="title clearfix">
                <h3 class="fl">{{ list.name }}</h3>
                <div class="fr">
                    <ul class="nav-tabs clearfix">
                        <li
                            class="active"
                            v-for="(nav, index) in list.navList"
                            :key="index"
                        >
                            <a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="floor-1">
                        <div class="blockgary">
                            <ul class="jd-list">
                                <li
                                    v-for="(keyword, index) in list.keywords"
                                    :key="index"
                                >
                                    {{ keyword }}
                                </li>
                            </ul>
                            <img
                                :src="'http://localhost:8888/api' + list.imgUrl"
                            />
                        </div>
                        <div class="floorBanner">
                            <!-- 轮播图部分 -->
                            <Carousel :list="list.carouselList"></Carousel>
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img
                                    :src="
                                        'http://localhost:8888/api' +
                                        list.recommendList[0]
                                    "
                                />
                            </div>
                            <div class="floor-conver-pit">
                                <img
                                    :src="
                                        'http://localhost:8888/api' +
                                        list.recommendList[1]
                                    "
                                />
                            </div>
                        </div>
                        <div class="split center">
                            <img
                                :src="'http://localhost:8888/api' + list.bigImg"
                            />
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img
                                    :src="
                                        'http://localhost:8888/api' +
                                        list.recommendList[2]
                                    "
                                />
                            </div>
                            <div class="floor-conver-pit">
                                <img
                                    :src="
                                        'http://localhost:8888/api' +
                                        list.recommendList[3]
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    // 接收从亲爹Home那儿传过来的参
    props: ["list"],
    mounted() {
        /* 这儿的轮播图不像ListContainer组件那儿的，这儿的是可以放到mounted中的，不需要watch和$nextTick什么的
        因为这儿的数据和dom结构，不是交给Floor组件完成的，完成这些的是它的父组件Home
        即，你在Floor中new Swiper的时候，dom和数据，Home早已弄好 */
        // -----------------------------------------------------------------
        // 下面为了配合全局组件Carousel，我们还是把Swiper写到watch中，所以把代码注释了
        // -----------------------------------------------------------------
        // 用ref获取dom
        /* new Swiper(this.$refs.cur, {
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
        }); */
    },
};
</script>

<style lang="less" scoped>
.floor {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            .fl {
                float: left;
                color: #c81623;
                font-size: 20px;
                line-height: 30px;
                margin: 9px 0;
                font-weight: 700;
            }

            .fr {
                float: right;

                .nav-tabs {
                    margin: 10px 0 0;
                    display: inline-block;

                    li {
                        float: left;
                        line-height: 18px;

                        a {
                            padding-top: 1px;
                            font-weight: 400;
                            background-color: #fff;

                            &::after {
                                content: "|";
                                padding: 0 10px;
                            }
                        }

                        &:nth-child(7) {
                            a {
                                &::after {
                                    content: "";
                                }
                            }
                        }

                        &.active {
                            a {
                                color: #e1251b;
                            }
                        }
                    }
                }
            }
        }

        .tab-content {
            border-top: 2px solid #c81623;
            border-bottom: 1px solid #e4e4e4;

            .tab-pane {
                .floor-1 {
                    height: 360px;
                    display: flex;

                    .blockgary {
                        width: 210px;
                        height: 100%;
                        background: #f7f7f7;

                        .jd-list {
                            padding: 15px 0;
                            overflow: hidden;

                            li {
                                list-style-type: none;
                                float: left;
                                width: 40%;
                                margin: 0 10px;
                                border-bottom: 1px solid #e4e4e4;
                                text-align: center;
                                line-height: 26px;
                            }
                        }

                        img {
                            width: 100%;
                        }
                    }

                    .floorBanner {
                        width: 330px;
                        height: 100%;
                    }

                    .split {
                        width: 220px;
                        height: 100%;
                        position: relative;

                        .floor-x-line {
                            position: absolute;
                            background: #e4e4e4;
                            width: 220px;
                            height: 1px;
                            top: 180px;
                        }

                        .floor-conver-pit {
                            width: 100%;
                            height: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                transition: all 400ms;

                                &:hover {
                                    opacity: 0.8;
                                }
                            }
                        }
                    }

                    .center {
                        border: 1px solid #e4e4e4;
                    }
                }
            }
        }
    }
}
</style>
