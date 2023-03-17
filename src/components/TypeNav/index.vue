<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <div class="sort" v-show="isShow">
                    <!-- 如果使用声明式导航的router-link的话，你在每级列表各自的div中写时，在执时，会把router-link这组件
                        也for好多次，这么一来，你router-link太多了，卡得一逼 -->
                    <!-- 如果用编程式导航，也是写在每级列表各自的div中时，这时的效果就是，不止div中的a标签会跳转了，div中的h标签页
                    有路由跳转的效果了，这就乱了 -->
                    <!-- 但编程式导航的思路是没错的，只不过这玩意儿不应该写在每级列表各自的div中，而是应写在列表们的那个大亲爹div去统一去
                    弄。期间需要通过vue自定义属性这东西来区分出a标签从而保证只有a标签具有跳转的功能，并且通过自定义属性来区分列表是几
                    级分类 -->
                    <div class="all-sort-list2" @click="toSearch">
                        <!-- 遍历生成一级列表 -->
                        <!-- 其中的 :class="{ cur: currentIndex == index } 可以理解为，{}中是个kv键值对
                    且这儿的v是一个逻辑表达式，返回值为ture或false。从而控制cur这个样式是否生效 -->
                        <div
                            class="item"
                            v-for="(c1, index) in categoryList"
                            :key="c1.categoryId"
                            :class="{ cur: currentIndex == index }"
                        >
                            <h3 @mouseenter="changeIndex(index)">
                                <!-- 自定义属性的格式为 ：data-属性名 -->
                                <!-- 如果属性名是驼峰式的写法，则浏览器在加载时，会将其全部转为小写，如 data-toApp 会变成data-toapp -->
                                <!-- 通过v-for带来的categoryName来判断是否为a标签，用category1Id来判断是否为一级列表 -->
                                <a
                                    :data-categoryName="c1.categoryName"
                                    :data-category1Id="c1.categoryId"
                                    >{{ c1.categoryName }}</a
                                >
                            </h3>
                            <div
                                class="item-list clearfix"
                                :style="{
                                    display:
                                        currentIndex == index
                                            ? 'block'
                                            : 'none',
                                }"
                            >
                                <!-- 遍历生成二级列表 -->
                                <div
                                    class="subitem"
                                    v-for="c2 in c1.categoryChild"
                                    :key="c2.categoryId"
                                >
                                    <dl class="fore">
                                        <dt>
                                            <a
                                                :data-categoryName="
                                                    c2.categoryName
                                                "
                                                :data-category2Id="
                                                    c2.categoryId
                                                "
                                                >{{ c2.categoryName }}</a
                                            >
                                        </dt>
                                        <dd>
                                            <!-- 遍历生成三级列表 -->
                                            <em
                                                v-for="c3 in c2.categoryChild"
                                                :key="c3.categoryId"
                                            >
                                                <a
                                                    :data-categoryName="
                                                        c3.categoryName
                                                    "
                                                    :data-category3Id="
                                                        c3.categoryId
                                                    "
                                                    >{{ c3.categoryName }}</a
                                                >
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入throttle这个节流函数
// 人弄的是默认暴露，所以不用 {throttle} 了。直接 throttle 就行
import throttle from "lodash/throttle";
export default {
    name: "TypeNav",
    data() {
        return {
            // 一共有16个一级分类，对应0~15。0~15这标号由v-for的index生成
            // 这里的-1代表谁都不选
            currentIndex: -1,
            isShow: true,
        };
    },
    methods: {
        // 节流时间为50ms
        // 下面是kv写法，k为changeIndex，v为throttle函数
        // throttle函数中的第一个参数是你需要进行节流的函数，第二个是配置节流多长时间
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        enterShow() {
            /* 其实这儿不用加这个if判断，因为鼠标enter时候调用enterShow来显示,
            当鼠标leave时，调用leaveIndex，而Home进不去这个if，所以isShow还是true云 */
            if (this.$route.path != "/home") {
                this.isShow = true;
            }
        },
        leaveIndex() {
            this.currentIndex = -1;
            /* enterShow中不用加这个if判断，因为鼠标enter时候调用enterShow来显示,
            当鼠标leave时，调用leaveIndex，而Home进不去这个if，所以isShow还是true云 */
            if (this.$route.path != "/home") {
                this.isShow = false;
            }
        },
        toSearch(event) {
            // 每个元素身上都会有一个dataset属性，它存储了属性身上所有的自定义属性
            // 下面一行就利用dataset属性将你自定义的4个属性解构出来使用
            /* 注意这儿category1id、category2id这些解构用的东西必须小写，前面说了浏览器会将驼峰解析成小写，
            再加上，这儿的解构是ES6的语法，kv一致？不知道，反正就那意思 */
            let { categoryname, category1id, category2id, category3id } =
                event.target.dataset;
            // 因为只有a标签可以解构出categoryname，所以只有a标签可以进入这个if
            if (categoryname) {
                // /search路由的name你配置的就是叫search，所以你这儿也让location的为search，一会儿用来跳转路由
                let location = { name: "search" };
                // 为query添一个kv键值对，k为categoryName，v为解构出的categoryname
                let query = { categoryName: categoryname };
                // 下面三个if判断是几级列表，并为query添加相应的kv
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                // 为location添加一个kv，k为自己起了个名字叫query，v为上面折腾半天的query
                location.query = query;
                // 如果你先在search栏输东西的话搜，按你写的代码，则会在Header的index.js中收到一个param参数，所以这儿得拼接一下
                location.params = this.$route.params;
                // vue的push要传的参数就是kv，如：
                /* this.$router.push({
                    name: "xiangqing",
                    params: {
                        id: xxx,
                        title: xxx,
                    },
                }); */
                // 那这儿，name就是没加query时的location，params即，参数部分，就是query
                // 然后push上去
                // 这时地址就如：localhost:8080/#/search?categoryName=%E7%87%83%E6%B0%94%E7%81%B6&category3Id=100 云了
                this.$router.push(location);
            }
        },
    },
    // 下面事项当组件挂载完毕后向服务器发送请求
    mounted() {
        // 只有Home和Search组件使用了TypeNav组件，所以下面的判断就是，只要路径不是 /home 那就将isShow置为false，即不显示
        if (this.$route.path != "/home") {
            this.isShow = false;
        }
    },
    computed: {
        ...mapState({
            // categoryList这个属性的value是一个函数，当使用categoryList这个属性时，这函数会同时执行一次
            //这函数执时的这个下面你写的形参state实际上就是vuex的那个总仓库
            // 这个总仓库按前面弄的，包含home和search这两个小仓库
            // 这儿你的计算属性又是categoryList，所以相应的return的是home仓库下的categoryList
            categoryList: (state) => state.home.categoryList,
            // 下面是上方代码的完整写法
            /* categoryList: (state) => {
                return state.home.categoryList;
            }, */
        }),
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }
                .cur {
                    background: skyblue;
                }
            }
        }
    }
}
</style>
