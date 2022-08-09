<template>
    <div style="margin: 10px">
        <div style="margin: 10px 0">
            <el-button type="primary" @click="add">新增</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-input v-model="search" placeholder="按照用户名进行查询" style="width: 20%" clearable></el-input> <el-button @click="load">查询</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;" stripe border>
            <el-table-column prop="id" label="ID"  sortable/>
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="nickName" label="昵称" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="role"  label="角色" >
                <template #default="scope">
                    <span v-if="scope.row.role===1">管理员</span>
                    <span v-if="scope.row.role===2">普通用户</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定要删除？" @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button link type="primary" size="small" >删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange(pageSize)"
                @current-change="handleCurrentChange(currentPage)"
                style="margin: 10px 0"/>

        <el-dialog v-model="dialogVisible" title="提示" width="30%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" style="width: 80%" />
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickName" style="width: 80%" />
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" style="width: 80%" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="form.sex" label="男">男</el-radio>
                    <el-radio v-model="form.sex" label="女">女</el-radio>
                    <el-radio v-model="form.sex" label="未知">未知</el-radio>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="form.address" style="width: 80%" />
                </el-form-item>
            </el-form>
            <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">撤销</el-button>
                    <el-button type="primary" @click="save" >确定</el-button>
                  </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "User",
        data() {
            return {
                search: '',
                currentPage:1,
                pageSize:5,
                total:10,
                tableData:[],
                form:{},
                dialogVisible:false,
            }
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                request.get('/user',{
                    params:{
                        pageNum:this.currentPage,
                        pageSize:this.pageSize,
                        search:this.search,
                    }
                }).then( res => {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                })
            },
            save() {
                if(!this.form.id) {
                    request.post('/user',this.form).then(res => {
                        console.log(res);
                        if(res.code == '0') {
                            this.$message({
                                type:"success",
                                message:"新增成功"
                            })
                        }else {
                            this.$message({
                                type:"error",
                                message:"新增失败"
                            })
                        }
                    })
                }else {
                    request.put('/user',this.form).then(res => {
                        console.log(res);
                        if(res.code == '0') {
                            this.$message({
                                type:"success",
                                message:"更新成功"
                            })
                        }else {
                            this.$message({
                                type:"error",
                                message:"更新失败"
                            })
                        }
                    })
                }
                this.dialogVisible = false;
                this.load();
            },
            add() {
                this.dialogVisible = true;
                this.form = {};

            },
            handleEdit(row) {
                this.form = JSON.parse(JSON.stringify(row));
                this.dialogVisible = true;
            },
            handleDelete(id) {
                request.delete('/user/' + id).then(res => {
                    if(res.code == '0') {
                        this.$message({
                            type:"success",
                            message:"删除成功"
                        })
                    }else {
                        this.$message({
                            type:"error",
                            message:"删除失败"
                        })
                    }
                })
                this.load();
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.load();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.load();
            }
        }
    }
</script>

<style scoped>

</style>