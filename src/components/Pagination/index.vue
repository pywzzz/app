<template>
    <div class="pagination">
        <!-- 分页器左部分 -->
        <!-- 如果当前是第1页的话，用html的disabled属性来阻止用户点击 -->
        <!-- 点击后会向父组件Search传送 pageNo - 1 这个数据 -->
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
            上一页
        </button>
        <!-- 用v-if控制何时显示 -->
        <button
            v-if="startNumAndEndNum.start > 1"
            @click="$emit('getPageNo', 1)"
        >
            1
        </button>
        <!-- ... 这个按钮是不能点的 -->
        <button v-if="startNumAndEndNum.start > 2">···</button>
        <!-- 分页器中部分 -->
        <!-- v-for是可以遍历数字的，它会从1开始,到v-for的数字处结束 -->
        <!-- 点击后会向父组件Search传送 pageNo 这个数据 -->
        <!-- active样式效果为背景高亮，表示选中。这儿不用单独给第1页和第totalPage页
        单独加这个active样式的相关，因为它俩都是在这儿v-for循环生成的 -->
        <button
            v-for="(page, index) in startNumAndEndNum.end"
            :key="index"
            v-if="page >= startNumAndEndNum.start"
            @click="$emit('getPageNo', page)"
            :class="{ active: pageNo == page }"
        >
            {{ page }}
        </button>
        <!-- 分页器右部分 -->
        <!-- 用v-if控制何时显示 -->
        <!-- ... 这个按钮是不能点的 -->
        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <!-- 点击后会向父组件Search传送 totalPage 这个数据 -->
        <button
            v-if="startNumAndEndNum.end < totalPage"
            @click="$emit('getPageNo', totalPage)"
        >
            {{ totalPage }}
        </button>
        <!-- 如果当前是第totalPage页即最后一页的话，用html的disabled属性来阻止用户点击 -->
        <!-- 点击后会向父组件Search传送 pageNo + 1 这个数据 -->
        <button
            :disabled="pageNo == totalPage"
            @click="$emit('getPageNo', pageNo - 1)"
        >
            下一页
        </button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ["pageNo", "pageSize", "total", "continues"],
    computed: {
        // 总页数
        totalPage() {
            // ceil表示向上取整
            return Math.ceil(this.total / this.pageSize);
        },
        // 分页器的开头页码和结尾页码
        startNumAndEndNum() {
            // 先解构一下
            const { continues, pageNo, totalPage } = this;
            let start = 0,
                end = 0;
            // 如果总页数比规定的连续的页数小。如规定的连续的为5页，但你只有3页
            if (totalPage < continues) {
                start = 1;
                end = totalPage;
            } else {
                // 否则即为总页数比规定的连续的页数大的情况
                // parseInt表示取整数部分
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
                // 因为如果当前页pageNo为1，continues为5，那就会出现start为负数的bug
                if (start < 1) {
                    start = 1;
                    end = continues;
                }
                //因为如果一共30页，当前页pageNo为29，continues为5，那就会出现end超过totalPage的bug
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
                // 返回计算后的数据
                return { start, end };
            }
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
