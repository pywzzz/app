<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul
                    class="cart-list"
                    v-for="cart in cartInfoList"
                    :key="cart.id"
                >
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="cart.isChecked == 1"
                            @change="updateChecked(cart, $event)"
                        />
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl" />
                        <div class="item-msg">
                            {{ cart.skuName }}
                        </div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ cart.skuPrice }}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a
                            href="javascript:void(0)"
                            class="mins"
                            @click="handler('reduce', -1, cart)"
                            >-</a
                        >
                        <input
                            autocomplete="off"
                            type="text"
                            :value="cart.skuNum"
                            minnum="1"
                            class="itxt"
                            @change="
                                handler('change', $event.target.value * 1, cart)
                            "
                        />
                        <a
                            href="javascript:void(0)"
                            class="plus"
                            @click="handler('add', 1, cart)"
                            >+</a
                        >
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{
                            cart.skuNum * cart.skuPrice
                        }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="sindelet" @click="deleteCartById(cart)"
                            >删除</a
                        >
                        <br />
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <!-- 这个 && cartInfoList.length > 0 表示列表没东西的话也不勾 -->
                <input
                    class="chooseAll"
                    type="checkbox"
                    :checked="isAllChecked && cartInfoList.length > 0"
                    @change="updateAllCartChecked"
                />
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteAllCheckedCart">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择 <span>0</span>件商品</div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ totalPrice }}</i>
                </div>
                <div class="sumbtn">
                    <router-link class="sum-btn" to="/trade">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
    name: "ShopCart",
    mounted() {
        this.getData();
    },
    computed: {
        ...mapGetters(["cartList"]),
        // 再弄个这主要是因为cartList并不你是想要的购物车数据罢
        cartInfoList() {
            return this.cartList.cartInfoList || [];
        },
        // 计算产品总价
        totalPrice() {
            let sum = 0;
            this.cartInfoList.forEach((item) => {
                sum += item.skuNum * item.skuPrice;
            });
            return sum;
        },
        // 计算“全选”这东西勾不勾
        isAllChecked() {
            // every用于遍历数组中的每一个元素
            return this.cartInfoList.every((item) => item.isChecked == 1);
        },
    },
    methods: {
        getData() {
            // 派发actions以得到购物车shopcart的相关数据
            this.$store.dispatch("getCartList");
        },
        /* 接口reqAddOrUpdateShopCart收到的${skuId}/${skuNum}这两个参数中，skuId指明
        产品id，skuNum表示商品数量的变化值，正数代表加多少，负数代表减多少 */
        // 这儿的num即skuNum，cart用于获取产品id
        // 这里弄个节流，要不点太快的话，数量可能会被点到0或负数
        handler: throttle(async function (type, num, cart) {
            switch (type) {
                case "add":
                    num = 1;
                    break;
                case "reduce":
                    num = cart.skuNum > 1 ? -1 : 0;
                    break;
                case "change":
                    num =
                        isNaN(num) || num < 1 ? 0 : parseInt(num) - cart.skuNum;
                    break;
            }
            try {
                await this.$store.dispatch("addOrUpdateShopCart", {
                    skuId: cart.skuId,
                    skuNum: num,
                });
                // 弄完重新获取数据
                this.getData();
            } catch (error) {}
        }, 1000),
        async deleteCartById(cart) {
            try {
                await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
                this.getData();
            } catch (error) {
                alter(error.message);
            }
        },
        // 第1个参数用于获取产品id，第2个参数用于获取当前元素的checked属性，看下勾没勾
        async updateChecked(cart, event) {
            try {
                // 因为接口只认1和0，所以这儿得把原本的true或false转为1或0
                let isChecked = event.target.checked ? "1" : "0";
                await this.$store.dispatch("updateCheckedBySkuId", {
                    skuId: cart.skuId,
                    // kv一致云
                    isChecked,
                });
                // 弄完重新获取数据
                this.getData();
            } catch (error) {
                alter(error.message);
            }
        },
        async deleteAllCheckedCart() {
            try {
                /* 派发actions后需要等，即await别人给你说成功了，才再去getData，要是不成功的话
                你getData不就是个无效操作了么，这就是async和await的用处 */
                await this.$store.dispatch("deleteAllCheckedCart");
                this.getData();
            } catch (error) {
                alter(error.message);
            }
        },
        async updateAllCartChecked(event) {
            try {
                // 接口要求的就是输入string类型的1或0，所加了个引号
                let isChecked = event.target.checked ? "1" : "0";
                await this.$store.dispatch("updateAllCartIsChecked", isChecked);
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
