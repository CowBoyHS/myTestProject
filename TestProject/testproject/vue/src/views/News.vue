<template>
    <div style="margin: 10px">
        <div style="margin: 10px 0">
            <el-button type="primary" @click="add">新增</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-input v-model="search" placeholder="按照标题进行查询" style="width: 20%" clearable></el-input> <el-button @click="load">查询</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;" stripe border>
            <el-table-column prop="id" label="ID"  sortable/>
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="author" label="作者" />
            <el-table-column prop="time" label="发布日期" />

            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="details(scope.row)">详情</el-button>
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

        <el-dialog v-model="dialogVisible" title="提示" width="50%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="标题">
                    <el-input v-model="form.title" style="width: 30%" />
                </el-form-item>
                <div id="div1">

                </div>

            </el-form>
            <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">撤销</el-button>
                    <el-button type="primary" @click="save" >确定</el-button>
                  </span>
            </template>
        </el-dialog>
        <el-dialog title="详情" v-model="vis" width="50%">
            <el-card>
                <div v-html="detail.content" style="min-height: 100px"></div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    import E from "wangeditor"
    import request from "@/utils/request";
    let editor;
    export default {
        name: "News",
        data() {
            return {
                search: '',
                currentPage:1,
                pageSize:5,
                total:10,
                tableData:[],
                form:{},
                dialogVisible:false,
                detail:{},
                vis:false,
            }
        },
        created() {
            this.load();
        },
        methods: {
            details(row) {
                this.detail = row;
                this.vis = true;
            },
            filesUploadSuccess(res) {
                console.log(res);
                this.form.cover = res.data;
            },
            load() {
                request.get('/news',{
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
                this.form.content = editor.txt.html();
                if(!this.form.id) {
                    let userStr = sessionStorage.getItem("user") || "{}";
                    let user = JSON.parse(userStr);
                    this.form.author = user.nickName;
                    request.post('/news',this.form).then(res => {
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
                    request.put('/news',this.form).then(res => {
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
                this.$nextTick(() => {
                    if(!editor) {
                        editor = new E("#div1")
                        editor.config.uploadImgServer = 'http://' + window.server.filesUploadUrl + ':9090/files/upload'//设置本地上传
                        editor.config.uploadFileName = 'file'//设置上传文件名称
                        editor.create();
                    }else {
                        editor.txt.clear();
                    }
                })
            },
            handleEdit(row) {
                this.form = JSON.parse(JSON.stringify(row));
                this.dialogVisible = true;
                this.$nextTick(() => {
                    if(!editor) {
                        editor = new E("#div1")
                        editor.config.uploadImgServer = 'http://' + window.server.filesUploadUrl + ':9090/files/upload'//设置本地上传
                        editor.config.uploadFileName = 'file'//设置上传文件名称
                        editor.create();
                        editor.txt.html(row.content);
                    }else {
                        editor.txt.html(row.content);
                    }
                })
            },
            handleDelete(id) {
                request.delete('/news/' + id).then(res => {
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