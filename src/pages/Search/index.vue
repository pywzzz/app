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
                        <li class="with-x">手机</li>
                        <li class="with-x">iphone<i>×</i></li>
                        <li class="with-x">华为<i>×</i></li>
                        <li class="with-x">OPPO<i>×</i></li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li class="active">
                                    <a href="#">综合</a>
                                </li>
                                <li>
                                    <a href="#">销量</a>
                                </li>
                                <li>
                                    <a href="#">新品</a>
                                </li>
                                <li>
                                    <a href="#">评价</a>
                                </li>
                                <li>
                                    <a href="#">价格⬆</a>
                                </li>
                                <li>
                                    <a href="#">价格⬇</a>
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
                //这是排序的参数，用一个数字代表升序降序什么的
                order: "",
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
    },
    methods: {
        getData() {
            // 获取search仓库的数据
            /* 如果不传参的话这儿写成 ("getSearchList",{}) ，或写成 ("getSearchList") 也行，因为
            你已经在search的store的actions配默认参为 {} 了 */
            // 这里传入searchParams参数
            this.$store.dispatch("getSearchList", this.searchParams);
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
                this.searchParams.category1Id = "";
                this.searchParams.category2Id = "";
                this.searchParams.category3Id = "";
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
