<template>
    <div class="trade-container">
        <h3 class="title">填写并核对订单信息</h3>
        <div class="content">
            <h5 class="receive">收件人信息</h5>
            <div v-if="processAddressInfo && processAddressInfo.length > 0">
                <div
                    class="address clearFix"
                    v-for="address in processAddressInfo"
                    :key="address.id"
                >
                    <span
                        class="username"
                        :class="{ selected: address.isSelect == 1 }"
                        >{{ address.consignee }}</span
                    >
                    <p @click="changeSelect(address, processAddressInfo)">
                        <span class="s1">{{ address.fullAddress }}</span>
                        <span class="s2">{{ address.phoneNum }}</span>
                        <span class="s3" v-show="address.isDefault == 1"
                            >默认地址</span
                        >
                    </p>
                </div>
            </div>
            <div v-else class="add-address-link">
                <router-link to="/center/myaddress">
                    您还未拥有任何收货地址：点我添加
                </router-link>
            </div>
            <div class="line"></div>
            <h5 class="pay">支付方式</h5>
            <div class="address clearFix">
                <span class="username selected">在线支付</span>
                <span class="username" style="margin-left: 5px">货到付款</span>
            </div>
            <div class="line"></div>
            <h5 class="pay">商品清单</h5>
            <div class="detail">
                <ul
                    class="list clearFix"
                    v-for="order in orderInfo.detailArrayList"
                    :key="order.skuId"
                >
                    <li>
                        <img
                            :src="order.skuDefaultImg"
                            alt=""
                            style="width: 100px; height: 100px"
                        />
                    </li>
                    <li>
                        <p>
                            {{ order.skuName }}
                        </p>
                        <h4>7天无理由退货</h4>
                    </li>
                    <li>
                        <h3>￥{{ order.skuPrice * order.skuNum }}.00</h3>
                    </li>
                    <li>X{{ order.skuNum }}</li>
                    <li>有货</li>
                </ul>
            </div>
            <div class="bbs">
                <h5>买家留言：</h5>
                <textarea
                    placeholder="建议留言前先与商家沟通确认"
                    class="remarks-cont"
                    v-model="msg"
                ></textarea>
            </div>
            <div class="line"></div>
            <div class="bill">
                <h5>发票信息：</h5>
                <div>普通发票（电子） 个人 明细</div>
                <h5>使用优惠/抵用</h5>
            </div>
        </div>
        <div class="money clearFix">
            <ul>
                <li>
                    <b
                        ><i>{{ totalAmount }}</i
                        >件商品，总商品金额：</b
                    >
                    <span>¥{{ totalNum }}.00</span>
                </li>
                <li>
                    <b>返现：</b>
                    <span>0.00</span>
                </li>
                <li>
                    <b>运费：</b>
                    <span>0.00</span>
                </li>
            </ul>
        </div>
        <div class="trade">
            <div class="price">
                应付金额：<span>¥{{ totalNum }}.00</span>
            </div>
            <div class="receiveInfo">
                寄送至：
                <span>{{ userSelectAddress.fullAddress }}</span
                ><br />
                收货人：<span>{{ userSelectAddress.consignee }}</span
                ><br />
                手机号：<span>{{ userSelectAddress.phoneNum }}</span>
            </div>
        </div>
        <div class="sub clearFix">
            <a class="subBtn" style="cursor: pointer" @click="submitOrder"
                >提交订单</a
            >
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Trade",
    mounted() {
        this.$store.dispatch("getUserAddress");
        this.$store.dispatch("getOrderInfo");
        this.processAddressInfo = this.addressInfo.map((address) => {
            return { ...address, isSelect: address.isDefault === 1 ? 1 : 0 };
        });
    },
    data() {
        return {
            // 给卖家的留言
            msg: "",
            // 接口返回的订单号
            orderId: "",
            // 在原先的基础上加了一个isSelect属性，其初始值与isDefault的值一致
            processAddressInfo: [],
        };
    },
    computed: {
        ...mapState({
            addressInfo: (state) => state.trade.address,
            orderInfo: (state) => state.trade.orderInfo,
        }),
        userSelectAddress() {
            // 数组的find方法会返回满足条件的数组
            return (
                this.processAddressInfo.find((item) => item.isSelect == 1) || {}
            );
        },
        totalAmount() {
            return this.orderInfo.detailArrayList.reduce(
                (accumulator, currentItem) => {
                    return accumulator + currentItem.skuNum;
                },
                0
            );
        },
        totalNum() {
            return this.orderInfo.detailArrayList.reduce(
                (accumulator, currentItem) => {
                    return (
                        accumulator + currentItem.skuPrice * currentItem.skuNum
                    );
                },
                0
            );
        },
    },
    methods: {
        changeSelect(address, processAddressInfo) {
            processAddressInfo.forEach((item) => {
                this.$set(item, "isSelect", 0);
            });
            this.$set(address, "isSelect", 1);
        },
        async submitOrder() {
            if (
                this.processAddressInfo &&
                this.processAddressInfo.length > 0 &&
                this.processAddressInfo.some(
                    (address) => address.isSelect === 1
                )
            ) {
                let data = {
                    // 付款人的名字
                    consignee: this.userSelectAddress.consignee,
                    // 付款人的手机号
                    consigneeTel: this.userSelectAddress.phoneNum,
                    // 付款人收货地址
                    deliveryAddress: this.userSelectAddress.fullAddress,
                    // 支付方式都是在线支付
                    paymentWay: "ONLINE",
                    // 买家留言
                    orderComment: this.msg,
                    // 购物车商品信息
                    orderDetailList: this.orderInfo.detailArrayList,
                };
                let result = await this.$API.reqSubmitOrder(data);
                if (result.code == 200) {
                    // 成功的话接口会返回一个叫data的订单号
                    this.orderId = result.data;
                    // 路由跳转的同时用query参数的形式传Pay组件所需的orderId这个数据
                    this.$router.push("/pay?orderId=" + this.orderId);
                } else {
                    alert(result.data);
                }
            } else {
                alert("请选择收货地址后再提交订单！");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.trade-container {
    .title {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        line-height: 21px;
    }

    .content {
        width: 1200px;
        margin: 10px auto 0;
        border: 1px solid rgb(221, 221, 221);
        padding: 25px;
        box-sizing: border-box;

        .receive,
        .pay {
            line-height: 36px;
            margin: 18px 0;
        }

        .address {
            padding-left: 20px;
            margin-bottom: 15px;

            .username {
                float: left;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #ddd;
                position: relative;
            }

            .username::after {
                content: "";
                display: none;
                width: 13px;
                height: 13px;
                position: absolute;
                right: 0;
                bottom: 0;
                background: url(./images/choosed.png) no-repeat;
            }

            .username.selected {
                border-color: #e1251b;
            }

            .username.selected::after {
                display: block;
            }

            p {
                width: 610px;
                float: left;
                line-height: 30px;
                margin-left: 10px;
                padding-left: 5px;
                cursor: pointer;

                .s1 {
                    float: left;
                }

                .s2 {
                    float: left;
                    margin: 0 5px;
                }

                .s3 {
                    float: left;
                    width: 56px;
                    height: 24px;
                    line-height: 24px;
                    margin-left: 10px;
                    background-color: #878787;
                    color: #fff;
                    margin-top: 3px;
                    text-align: center;
                }
            }

            p:hover {
                background-color: #ddd;
            }
        }

        .line {
            height: 1px;
            background-color: #ddd;
        }

        .way {
            width: 1080px;
            height: 110px;
            background: #f4f4f4;
            padding: 15px;
            margin: 0 auto;

            h5 {
                line-height: 50px;
            }

            .info {
                margin-top: 20px;

                .s1 {
                    float: left;
                    border: 1px solid #ddd;
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 10px;
                }

                p {
                    line-height: 30px;
                }
            }
        }

        .detail {
            width: 1080px;

            background: #feedef;
            padding: 15px;
            margin: 2px auto 0;

            h5 {
                line-height: 50px;
            }

            .list {
                display: flex;
                justify-content: space-between;

                li {
                    line-height: 30px;

                    p {
                        margin-bottom: 20px;
                    }

                    h4 {
                        color: #c81623;
                        font-weight: 400;
                    }

                    h3 {
                        color: #e12228;
                    }
                }
            }
        }

        .bbs {
            margin-bottom: 15px;

            h5 {
                line-height: 50px;
            }

            textarea {
                width: 100%;
                border-color: #e4e2e2;
                line-height: 1.8;
                outline: none;
                resize: none;
            }
        }

        .bill {
            h5 {
                line-height: 50px;
            }

            div {
                padding-left: 15px;
            }
        }
    }

    .money {
        width: 1200px;
        margin: 20px auto;

        ul {
            width: 220px;
            float: right;

            li {
                line-height: 30px;
                display: flex;
                justify-content: space-between;

                i {
                    color: red;
                }
            }
        }
    }

    .trade {
        box-sizing: border-box;
        width: 1200px;
        padding: 10px;
        margin: 10px auto;
        text-align: right;
        background-color: #f4f4f4;
        border: 1px solid #ddd;

        div {
            line-height: 30px;
        }

        .price span {
            color: #e12228;
            font-weight: 700;
            font-size: 14px;
        }

        .receiveInfo {
            color: #999;
        }
    }

    .sub {
        width: 1200px;
        margin: 0 auto 10px;

        .subBtn {
            float: right;
            width: 164px;
            height: 56px;
            font: 700 18px "微软雅黑";
            line-height: 56px;
            text-align: center;
            color: #fff;
            background-color: #e1251b;
        }
    }
}

.add-address-link {
    background-color: #f8d7da;
    color: #721c24;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
    margin: 10px;
}

.add-address-link a {
    font-weight: bold;
    text-decoration: none;
    color: #721c24;
}
</style>
