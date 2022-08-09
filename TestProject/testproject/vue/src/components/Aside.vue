<template>
    <div>
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                style="width: 200px; min-height: calc(100vh - 50px);"
                router>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>系统管理</span>
                </template>
                    <el-menu-item index="/user" v-if="user.role ===1">用户管理</el-menu-item>
                    <el-menu-item index="/book" >书籍管理</el-menu-item>
                    <el-menu-item index="/news">新闻管理</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script>
   //import request from "@/utils/request";
    export default {
        name: "Aside",
        data() {
            return {
                 user:{},
            }
        },
        created() {
            let userStr = sessionStorage.getItem("user") || "{}";
            this.user = JSON.parse(userStr);

            // request.get("/user/" + this.user.id).then(res => {
            //     if(res.code ==='0') {
            //         this.user = res.data;
            //     }
            // })
        },
    }
</script>

<style scoped>

</style>