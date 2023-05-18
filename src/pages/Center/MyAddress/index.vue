<template>
    <div class="my-address">
        <el-table :data="addresses" border style="width: 100%">
            <el-table-column property="consignee" label="收件人" width="width">
            </el-table-column>
            <el-table-column
                property="fullAddress"
                label="详细地址"
                width="width"
            ></el-table-column>
            <el-table-column
                property="phoneNum"
                label="联系电话"
                width="width"
            ></el-table-column>
            <el-table-column label="操作" width="width">
                <template slot-scope="{ row }">
                    <el-button
                        type="warning"
                        size="mini"
                        icon="el-icon-edit"
                        title="修改地址"
                        @click="updateAddress(row)"
                    ></el-button>
                    <el-popconfirm
                        title="确定删除吗？"
                        @confirm="deleteAddress(row)"
                    >
                        <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            title="删除地址"
                            slot="reference"
                            style="margin-left: 10px"
                        ></el-button
                    ></el-popconfirm>
                </template>
            </el-table-column>
            <el-table-column label="" width="width">
                <template slot-scope="{ row }">
                    <el-button
                        type="primary"
                        size="mini"
                        v-if="row.isDefault == 0"
                        @click="changeDefault(row)"
                        >设为默认</el-button
                    >
                    <el-button size="mini" v-else>默认地址</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br />
        <div class="add-address">
            <h3>添加新地址</h3>
            <form @submit.prevent="addAddress">
                <label for="consignee">收件人：</label>
                <input
                    type="text"
                    id="consignee"
                    v-model="newAddress.consignee"
                    required
                />
                <label for="phoneNum">电话：</label>
                <input
                    type="text"
                    id="phoneNum"
                    v-model="newAddress.phoneNum"
                    required
                />
                <label for="fullAddress">地址：</label>
                <input
                    type="text"
                    id="fullAddress"
                    v-model="newAddress.fullAddress"
                    required
                />
                <button type="submit">添加地址</button>
            </form>
        </div>
        <el-dialog title="修改地址" :visible.sync="dialogVisible">
            <el-form style="width: 80%" :model="updateOldAddress">
                <el-form-item
                    label="收件人"
                    label-width="100px"
                    prop="consignee"
                >
                    <el-input
                        autocomplete="off"
                        v-model="updateOldAddress.consignee"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="详细地址"
                    label-width="100px"
                    prop="fullAddress"
                >
                    <el-input
                        autocomplete="off"
                        v-model="updateOldAddress.fullAddress"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="联系电话"
                    label-width="100px"
                    prop="phoneNum"
                >
                    <el-input
                        autocomplete="off"
                        v-model="updateOldAddress.phoneNum"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUpdata">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "",
    mounted() {
        this.$store.dispatch("getUserAddress");
    },
    data() {
        return {
            newAddress: {
                consignee: "",
                phoneNum: "",
                fullAddress: "",
            },
            updateOldAddress: {
                consignee: "",
                phoneNum: "",
                fullAddress: "",
            },
            dialogVisible: false,
        };
    },
    computed: {
        ...mapState({
            addresses: (state) => state.trade.address,
        }),
    },
    methods: {
        changeDefault(row) {
            this.addresses.forEach((item) => {
                item.isDefault = 0;
            });
            row.isDefault = 1;
            this.$store.dispatch("changeDefaultUserAddress", {
                userId: row.userId,
                addressId: row.id,
            });
        },
        addAddress() {
            this.$store.dispatch("addUserAddress", this.newAddress);
            // 添加成功后重置数据
            this.newAddress = {
                consignee: "",
                phoneNum: "",
                fullAddress: "",
            };
            // 重新获取数据
            this.$store.dispatch("getUserAddress");
        },
        updateAddress(row) {
            this.dialogVisible = true;
            this.updateOldAddress = { ...row };
        },
        deleteAddress(row) {
            this.$store.dispatch("deleteUserAddress", row.id);
            // 重新获取数据
            this.$store.dispatch("getUserAddress");
        },
        saveUpdata() {
            this.$store.dispatch("updateUserAddress", this.updateOldAddress);
            // 修改成功后重置数据
            this.updateOldAddress = {
                consignee: "",
                phoneNum: "",
                fullAddress: "",
            };
            this.dialogVisible = false;
            // 重新获取数据
            this.$store.dispatch("getUserAddress");
        },
    },
};
</script>

<style lang="css" scoped>
.my-address {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

.address {
    padding: 20px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.address .username {
    font-weight: bold;
    flex: 1;
}

.address .s1 {
    flex: 2;
}

.address .s2 {
    flex: 1;
}

.address .s3 {
    flex: 1;
    color: green;
}

.add-address {
    padding: 20px;
    border: 1px solid #ccc;
}

.add-address form {
    display: flex;
    flex-direction: column;
}

.add-address form label {
    margin-top: 10px;
}

.add-address form button {
    margin-top: 20px;
    padding: 10px;
}
</style>
