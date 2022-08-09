<template>
    <div style="margin: 10px">
        <div style="margin: 10px 0">
            <el-button type="primary" @click="add">新增</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-input v-model="search" placeholder="按照书名进行查询" style="width: 20%" clearable></el-input> <el-button @click="load">查询</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;" stripe border>
            <el-table-column prop="id" label="ID"  sortable/>
            <el-table-column prop="bookName" label="书名" />
            <el-table-column prop="price" label="价格" />
            <el-table-column prop="author" label="作者" />
            <el-table-column prop="createTime" label="出版日期" />
            <el-table-column  label="封面" width="120">
                <template #default="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.cover"
                            :preview-src-list="[scope.row.cover]"
                            preview-teleported="true"
                    />
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
                <el-form-item label="书名">
                    <el-input v-model="form.bookName" style="width: 80%" />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price" style="width: 80%" />
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.author" style="width: 80%" />
                </el-form-item>
                <el-form-item label="出版日期">
                    <el-input type="Date" v-model="form.createTime" style="width: 80%" />
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload ref="upload" :action="filesUploadUrl" :on-success="filesUploadSuccess">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
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
        name: "Book",
        data() {
            return {
                search: '',
                currentPage:1,
                pageSize:5,
                total:10,
                tableData:[],
                form:{},
                dialogVisible:false,
                filesUploadUrl:"http://" + window.server.filesUploadUrl + ":9090/files/upload"
            }
        },
        created() {
            this.load();
        },
        methods: {
            filesUploadSuccess(res) {
                console.log(res);
                this.form.cover = res.data;
            },
            load() {
                request.get('/book',{
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
                    request.post('/book',this.form).then(res => {
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
                    request.put('/book',this.form).then(res => {
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
                //异步处理
                this.$nextTick(() => {
                    this.$refs['upload'].clearFiles();//清除历史文件列表
                })
            },
            handleEdit(row) {
                this.form = JSON.parse(JSON.stringify(row));
                this.dialogVisible = true;
            },
            handleDelete(id) {
                request.delete('/book/' + id).then(res => {
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
            },
        }
    }
</script>

<style scoped>

</style>