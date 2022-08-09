<template>
    <div style="width: 100%; height: 100vh; background-color: darkslateblue; overflow: hidden">
        <div style="width: 400px; margin: 150px auto;">
            <div style="color: #cccccc; font-size: 30px; text-align: center; padding: 30px 0">欢迎登录</div>
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input  v-model="form.username" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "Login",
        data() {
            return {
                form: {},
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                },
            }
        },
        methods: {
            login() {
                //如果输入合法才进行请求
                this.$refs['form'].validate((valid) => {
                    if(valid) {
                        request.post("/user/login",this.form).then(res => {
                            console.log(res);
                            if(res.code === '0') {
                                this.$message({
                                    type: "success",
                                    message:"登录成功"
                                })
                                sessionStorage.setItem("user",JSON.stringify(res.data));//缓存用户信息
                                this.$router.push("/");//登录成功之后进行页面跳转
                            }else {
                                this.$message({
                                    type: "error",
                                    message:res.msg
                                })
                            }
                        })
                    }
                })
            }
        }
    }

</script>

<style scoped>

</style>