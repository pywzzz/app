<template>
    <div>
        <TypeNav></TypeNav>
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 下面是三级列表的面包屑 -->
                        <li class="with-x" v-if="searchParams.categoryName">
                            {{ searchParams.categoryName
                            }}<i @click="removeCategoryName">×</i>
                        </li>
                        <!-- 下面是用户输入的关键字的面包屑 -->
                        <li class="with-x" v-if="searchParams.keyword">
                            {{ searchParams.keyword
                            }}<i @click="removeKeyword">×</i>
                        </li>
                        <!-- 下面是SearchSelector组件中品牌的面包屑 -->
                        <!-- 这儿的插值语法弄个 .split(":")[1] 是因为trademark的数据格式
                        是 ID:NAME ，我们只想展示NAME，所以split下 -->
                        <li class="with-x" v-if="searchParams.trademark">
                            {{ searchParams.trademark.split(":")[1]
                            }}<i @click="removeTrademark">×</i>
                        </li>
                        <!-- 下面是SearchSelector组件中售卖属性的面包屑 -->
                        <!-- 因为这儿的props是个数组，所以不能用v-if了，得用v-for了 -->
                        <!-- 且这儿的removeAttr得传个index，即传个序号，的参，仍是因为这儿的props是个数组 -->
                        <li
                            class="with-x"
                            v-for="(attrValue, index) in searchParams.props"
                            :key="index"
                        >
                            {{ attrValue.split(":")[1]
                            }}<i @click="removeAttr(index)">×</i>
                        </li>
                    </ul>
                </div>

                <!-- 这些个自定义事件是为了实现子组件SearchSelector向父组件Search传参用 -->
                <SearchSelector
                    @trademarkInfo="trademarkInfo"
                    @attrInfo="attrInfo"
                />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <!-- active样式效果为背景高亮，表示选中 -->
                                <!-- changeOrder的形参，1代表综合排序，2代表价格排序 -->
                                <li
                                    :class="{ active: isOne }"
                                    @click="changeOrder('1')"
                                >
                                    <!-- iconfont这个class是上下箭头共用的。icon-UP和icon-DOWN分别对应上下箭头 -->
                                    <a
                                        >综合<span
                                            v-show="isOne"
                                            class="iconfont"
                                            :class="{
                                                'icon-UP': isAsc,
                                                'icon-DOWN': isDesc,
                                            }"
                                        ></span
                                    ></a>
                                </li>
                                <!-- active样式效果为背景高亮，表示选中 -->
                                <!-- changeOrder的形参，1代表综合排序，2代表价格排序 -->
                                <li
                                    :class="{ active: isTwo }"
                                    @click="changeOrder('2')"
                                >
                                    <!-- iconfont这个class是上下箭头共用的。icon-UP和icon-DOWN分别对应上下箭头 -->
                                    <a
                                        >价格<span
                                            v-show="isTwo"
                                            class="iconfont"
                                            :class="{
                                                'icon-UP': isAsc,
                                                'icon-DOWN': isDesc,
                                            }"
                                        ></span
                                    ></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li
                                class="yui3-u-1-5"
                                v-for="good in goodsList"
                                :key="good.id"
                            >
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a href="item.html" target="_blank"
                                            ><img :src="good.defaultImg"
                                        /></a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{ good.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a
                                            target="_blank"
                                            href="item.html"
                                            :title="good.title"
                                            >{{ good.title }}</a
                                        >
                                    </div>
                                    <div class="commit">
                                        <i class="command"
                                            >已有<span>2000</span>人评价</i
                                        >
                                    </div>
                                    <div class="operate">
                                        <a
                                            href="success-cart.html"
                                            target="_blank"
                                            class="sui-btn btn-bordered btn-danger"
                                            >加入购物车</a
                                        >
                                        <a
                                            href="javascript:void(0);"
                                            class="sui-btn btn-bordered"
                                            >收藏</a
                                        >
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="fr page">
                        <div class="sui-pagination clearfix">
                            <ul>
                                <li class="prev disabled">
                                    <a href="#">«上一页</a>
                                </li>
                                <li class="active">
                                    <a href="#">1</a>
                                </li>
                                <li>
                                    <a href="#">2</a>
                                </li>
                                <li>
                                    <a href="#">3</a>
                                </li>
                                <li>
                                    <a href="#">4</a>
                                </li>
                                <li>
                                    <a href="#">5</a>
                                </li>
                                <li class="dotted"><span>...</span></li>
                                <li class="next">
                                    <a href="#">下一页»</a>
                                </li>
                            </ul>
                            <div><span>共10页&nbsp;</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
    name: "Search",
    data() {
        return {
            //使用Search模块搜索时可能用到的参数
            searchParams: {
                // -------------------------------
                //商品名字
                categoryName: "",
                //一级分类的id
                category1Id: "",
                //二级分类的id
                category2Id: "",
                //三级分类的id
                category3Id: "",
                // -------------------------------
                //用户搜索的关键字
                keyword: "",
                //筛选手机的品牌用
                trademark: "",
                //里面放的是筛选商品的那些条件，比如内存、系统什么的
                props: [],
                // -------------------------------
                //这是排序的参数,1代表按综合排序，2代表按价格排序。desc代表降序，asc代表升序
                //默认上去是 1:desc ,即综合降序排序
                order: "1:desc",
                //这是让分页器用的，代表当前是第几页
                pageNo: 1,
                //代表一页展示多少个数据
                pageSize: 3,
                // -------------------------------
            },
        };
    },
    components: {
        SearchSelector,
    },
    computed: {
        ...mapGetters(["goodsList"]),
        // 配合order参数来控制是综合排序还是价格排序
        isOne() {
            return this.searchParams.order.indexOf("1") != -1;
        },
        // 配合order参数来控制是综合排序还是价格排序
        isTwo() {
            return this.searchParams.order.indexOf("2") != -1;
        },
        // 配合order参数来控制是升序还是降序
        isAsc() {
            return this.searchParams.order.indexOf("asc") != -1;
        },
        // 配合order参数来控制是升序还是降序
        isDesc() {
            return this.searchParams.order.indexOf("desc") != -1;
        },
    },
    methods: {
        getData() {
            // 获取search仓库的数据
            /* 如果不传参的话这儿写成 ("getSearchList",{}) ，或写成 ("getSearchList") 也行，因为
            你已经在search的store的actions配默认参为 {} 了 */
            // 这里传入searchParams参数
            this.$store.dispatch("getSearchList", this.searchParams);
        },
        removeCategoryName() {
            // 置空的话面包屑那部分的v-if就为false，所以隐藏了，所以就达到了删除的效果
            this.searchParams.categoryName = "";
            // 这儿置为undefined比置空的好处是这样的话，category-xxx-Id这个属性也不会带到请求数据中了，性能更好
            // 这儿置为undefined的理由和watch中的$route一样
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            // 这儿是实现面包屑关闭后跳转到之前的页面
            /* 面包屑关闭后，下面的代码使路由发生变化，触发了watch的$route，从而调了 this.getData() 所以
            removeCategoryName中就不用写这句了 */
            this.$router.push({
                name: "search",
                // 别忘了带上params参数
                params: this.$route.params,
            });
        },
        removeKeyword() {
            // 置空的话面包屑那部分的v-if就为false，所以隐藏了，所以就达到了删除的效果
            this.searchParams.keyword = "";
            // 通知兄弟组件Header把那儿的keyword给清下
            this.$bus.$emit("clear");
            // 这儿是实现面包屑关闭后跳转到之前的页面
            /* 面包屑关闭后，下面的代码使路由发生变化，触发了watch的$route，从而调了 this.getData() 所以
            removeKeyword中就不用写这句了 */
            this.$router.push({
                name: "search",
                // 别忘了带上query参数
                query: this.$route.query,
            });
        },
        removeTrademark() {
            // 置空的话面包屑那部分的v-if就为false，所以隐藏了，所以就达到了删除的效果
            this.searchParams.trademark = "";
            this.getData();
        },
        removeAttr(index) {
            // splice第一个index表示从哪里开始删，第二个参数表示从index处开始，往后删几个
            this.searchParams.props.splice(index, 1);
            this.getData();
        },
        // 实现子组件SearchSelector向父组件Search传参用的自定义事件@trademarkInfo的回调函数
        // 接收子组件传来的叫trademark的数据
        trademarkInfo(trademark) {
            // 迎合人规定的trademark数据的格式： ID:NAME
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
            // 弄完后重新请求数据
            this.getData();
        },
        // 实现子组件SearchSelector向父组件Search传参用的自定义事件@attrInfo的回调函数
        // 接收子组件传来的叫attr和attrValue的数据
        attrInfo(attr, attrValue) {
            /* 迎合人规定的props数据的格式：[属性ID:属性值:属性名]，如：[123:安卓手机:手机系统]
            其中属性ID和属性名可在v-for attrsList得到的attr中得到，属性值在v-forattrsList得到的attrValue中得到 */
            /* 这儿不同于上面的trademarkInfo中的trademark，因为trademark是个字符串，赋值的话直接等号就行了，而这儿的
            props是个数组，数组中可能不止一个元素，所以不能用等号。向数组中添加元素的话，要用push方法 */
            // 且这里要加一个数组去重的if，否则你同时点一个的话，面包屑该有重复了
            if (
                this.searchParams.props.indexOf(
                    `${attr.attrId}:${attrValue}:${attr.attrName}`
                )
            ) {
                this.searchParams.props.push(
                    `${attr.attrId}:${attrValue}:${attr.attrName}`
                );
            }
            // 弄完后重新请求数据
            this.getData();
        },
        // 改变排序相关
        changeOrder(flag) {
            let newOrder = "";
            // order的数据格式是 Flag:Sort ，如 1:desc 代表综合降序排序
            let originFlag = this.searchParams.order.split(":")[0];
            let originSort = this.searchParams.order.split(":")[1];
            if (flag == originFlag) {
                // 如果重复点同一个按钮，则应该在asc和desc间切换，而Flag不变
                newOrder = `${originFlag}:${
                    originSort == "desc" ? "asc" : "desc"
                }`;
            } else {
                // 否则，即不是同一个按钮，则传入新的Flag，然后默认都改成desc，即降序
                newOrder = `${flag}:${"desc"}`;
            }
            this.searchParams.order = newOrder;
            // 弄完后重新请求数据
            this.getData();
        },
    },
    watch: {
        $route: {
            // 上去就watch一下，让Search组件有相应的数据
            // 不加这个 immediate: true 的话你还得在beforeMount和mounted中分别写个 Object.assign(XXX) 和 this.getData() 云
            immediate: true,
            handler() {
                /* 因为，在一次请求得到的数据中，category1Id、category2Id、category3Id这三个东西，数据中只需要一个（另外两个应为空），就，你的数据不能
                即拥有category1Id又拥有category2Id。所以你需要下面三行的置空，从而避免上面assign的时候把上一轮的category-xxx-Id“合并”到新的一轮 */
                /* 就，如你的某一轮请求，得到了category2Id，值为47，其余两个为空。之后接下来第二次请求，这次请求运气好，仍得到的category2Id，只是值变为22，这时
                assign为你合并了一下，现在你拥有的是category2Id，值为22，其余两个为空。但第三轮运气没这么好了，下一轮得到的是category3Id，值为87，那这时候，
                assign一合并的话，值为22的category2Id并不会被覆盖，同时你又得到了个新的category3Id，这时就是，你同时拥有了两个category-xxx-Id属性，乱了就 */
                this.searchParams.category1Id = undefined;
                this.searchParams.category2Id = undefined;
                this.searchParams.category3Id = undefined;
                // 下面这段原来是写在beforeMount中的，现在照搬到这儿（注释也是照搬的）
                // 这儿的assign是ES6的语法，用于对象的合并。它会把第1个参数后面的几个参数覆盖到第1个参数
                // 所以这儿你就不用写很多如 this.searchParams.category1Id=this.$route.query.category1Id 这种了
                Object.assign(
                    this.searchParams,
                    this.$route.query,
                    this.$route.params
                );
                // 下面这一行原来是写在mounted中的，现在照搬到这儿（注释也是照搬的）
                // Search组件第一次挂载时候先加载出数据
                this.getData();
            },
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .page {
                width: 733px;
                height: 66px;
                overflow: hidden;
                float: right;

                .sui-pagination {
                    margin: 18px 0;

                    ul {
                        margin-left: 0;
                        margin-bottom: 0;
                        vertical-align: middle;
                        width: 490px;
                        float: left;

                        li {
                            line-height: 18px;
                            display: inline-block;

                            a {
                                position: relative;
                                float: left;
                                line-height: 18px;
                                text-decoration: none;
                                background-color: #fff;
                                border: 1px solid #e0e9ee;
                                margin-left: -1px;
                                font-size: 14px;
                                padding: 9px 18px;
                                color: #333;
                            }

                            &.active {
                                a {
                                    background-color: #fff;
                                    color: #e1251b;
                                    border-color: #fff;
                                    cursor: default;
                                }
                            }

                            &.prev {
                                a {
                                    background-color: #fafafa;
                                }
                            }

                            &.disabled {
                                a {
                                    color: #999;
                                    cursor: default;
                                }
                            }

                            &.dotted {
                                span {
                                    margin-left: -1px;
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    font-size: 14px;
                                    border: 0;
                                    padding: 9px 18px;
                                    color: #333;
                                }
                            }

                            &.next {
                                a {
                                    background-color: #fafafa;
                                }
                            }
                        }
                    }

                    div {
                        color: #333;
                        font-size: 14px;
                        float: right;
                        width: 241px;
                    }
                }
            }
        }
    }
}
</style>
