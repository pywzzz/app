<template lang="">
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>超市欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <!-- 声明式导航要有to属性 -->
                        <router-link to="/login">登录</router-link>
                        <!-- css样式的class属性该写还是写 -->
                        <router-link to="/register" class="register"
                            >免费注册</router-link
                        >
                    </p>
                    <p v-else>
                        <a>{{ userName }}</a
                        ><a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myorder">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的超市</a>
                    <a href="###">超市会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注超市</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" class="logo">
                    <img
                        src="./images/logo.png"
                        alt=""
                        style="height: 56px; width: 56px"
                    />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input
                        type="text"
                        id="autocomplete"
                        class="input-error input-xxlarge"
                        v-model="keyword"
                    />
                    <button
                        class="sui-btn btn-xlarge btn-danger"
                        type="button"
                        @click="toSearch"
                    >
                        搜索
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            keyword: "",
        };
    },
    computed: {
        userName() {
            return this.$store.state.user.userInfo.username;
        },
    },
    methods: {
        toSearch() {
            let location = {
                name: "search",
                // params的kv键值对中k为自定义的keyword，v为上面通过v-model接到的data数据，数据名叫keyword
                /* 当你指定了param可传可不传后，一个新的问题就是，当param参数是个空的字符串的话，虽然路由会跳转，
                但是仍会出现地址栏显示 localhost:8080/#/home/?canshu=444 ，即，没有/search这param参数的
                错误。这儿把 keyword: this.keyword 弄成 keyword: this.keyword || undefined即可
                解决问题 */
                params: { keyword: this.keyword || undefined },
            };
            // 如果你先点导航栏，按你写的代码，则会在TypeNav的index.js中收到一个query参数，所以这儿得拼接一下
            location.query = this.$route.query;
            // 如果把 let location 中的一堆写到push({})中，那这是路由传递参数的对象写法
            this.$router.push(location);
        },
        async logout() {
            try {
                // 如果退出成功
                await this.$store.dispatch("userLogout");
                // 就回到首页
                this.$router.push("/home");
            } catch (error) {}
        },
    },
    mounted() {
        // 收到Search组件那儿下达的任务，把keyword给清了
        this.$bus.$on("clear", () => {
            this.keyword = "";
        });
    },
};
</script>
<style lang="less" scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
