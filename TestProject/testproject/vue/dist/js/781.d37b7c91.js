"use strict";(self["webpackChunktestproject"]=self["webpackChunktestproject"]||[]).push([[781],{9781:function(e,a,l){l.r(a),l.d(a,{default:function(){return U}});var t=l(6252);const o={style:{margin:"10px"}},s={style:{margin:"10px 0"}},r=(0,t.Uk)("新增"),d={style:{margin:"10px 0"}},i=(0,t.Uk)(),m=(0,t.Uk)("查询"),n={key:0},u={key:1},p=(0,t.Uk)("编辑"),g=(0,t.Uk)("删除"),h=(0,t.Uk)("男"),c=(0,t.Uk)("女"),f=(0,t.Uk)("未知"),w={class:"dialog-footer"},b=(0,t.Uk)("撤销"),V=(0,t.Uk)("确定");function k(e,a,l,k,W,y){const _=(0,t.up)("el-button"),C=(0,t.up)("el-input"),U=(0,t.up)("el-table-column"),z=(0,t.up)("el-popconfirm"),x=(0,t.up)("el-table"),S=(0,t.up)("el-pagination"),v=(0,t.up)("el-form-item"),D=(0,t.up)("el-radio"),P=(0,t.up)("el-form"),N=(0,t.up)("el-dialog");return(0,t.wg)(),(0,t.iD)("div",o,[(0,t._)("div",s,[(0,t.Wm)(_,{type:"primary",onClick:y.add},{default:(0,t.w5)((()=>[r])),_:1},8,["onClick"])]),(0,t._)("div",d,[(0,t.Wm)(C,{modelValue:W.search,"onUpdate:modelValue":a[0]||(a[0]=e=>W.search=e),placeholder:"按照用户名进行查询",style:{width:"20%"},clearable:""},null,8,["modelValue"]),i,(0,t.Wm)(_,{onClick:y.load},{default:(0,t.w5)((()=>[m])),_:1},8,["onClick"])]),(0,t.Wm)(x,{data:W.tableData,style:{width:"100%"},stripe:"",border:""},{default:(0,t.w5)((()=>[(0,t.Wm)(U,{prop:"id",label:"ID",sortable:""}),(0,t.Wm)(U,{prop:"username",label:"用户名"}),(0,t.Wm)(U,{prop:"nickName",label:"昵称"}),(0,t.Wm)(U,{prop:"age",label:"年龄"}),(0,t.Wm)(U,{prop:"sex",label:"性别"}),(0,t.Wm)(U,{prop:"address",label:"地址"}),(0,t.Wm)(U,{prop:"role",label:"角色"},{default:(0,t.w5)((e=>[1===e.row.role?((0,t.wg)(),(0,t.iD)("span",n,"管理员")):(0,t.kq)("",!0),2===e.row.role?((0,t.wg)(),(0,t.iD)("span",u,"普通用户")):(0,t.kq)("",!0)])),_:1}),(0,t.Wm)(U,{fixed:"right",label:"操作",width:"120"},{default:(0,t.w5)((e=>[(0,t.Wm)(_,{link:"",type:"primary",size:"small",onClick:a=>y.handleEdit(e.row)},{default:(0,t.w5)((()=>[p])),_:2},1032,["onClick"]),(0,t.Wm)(z,{title:"确定要删除？",onConfirm:a=>y.handleDelete(e.row.id)},{reference:(0,t.w5)((()=>[(0,t.Wm)(_,{link:"",type:"primary",size:"small"},{default:(0,t.w5)((()=>[g])),_:1})])),_:2},1032,["onConfirm"])])),_:1})])),_:1},8,["data"]),(0,t.Wm)(S,{currentPage:W.currentPage,"onUpdate:currentPage":a[1]||(a[1]=e=>W.currentPage=e),"page-size":W.pageSize,"onUpdate:page-size":a[2]||(a[2]=e=>W.pageSize=e),"page-sizes":[5,10,20],layout:"total, sizes, prev, pager, next, jumper",total:W.total,onSizeChange:a[3]||(a[3]=e=>y.handleSizeChange(W.pageSize)),onCurrentChange:a[4]||(a[4]=e=>y.handleCurrentChange(W.currentPage)),style:{margin:"10px 0"}},null,8,["currentPage","page-size","total"]),(0,t.Wm)(N,{modelValue:W.dialogVisible,"onUpdate:modelValue":a[13]||(a[13]=e=>W.dialogVisible=e),title:"提示",width:"30%"},{footer:(0,t.w5)((()=>[(0,t._)("span",w,[(0,t.Wm)(_,{onClick:a[12]||(a[12]=e=>W.dialogVisible=!1)},{default:(0,t.w5)((()=>[b])),_:1}),(0,t.Wm)(_,{type:"primary",onClick:y.save},{default:(0,t.w5)((()=>[V])),_:1},8,["onClick"])])])),default:(0,t.w5)((()=>[(0,t.Wm)(P,{model:W.form,"label-width":"120px"},{default:(0,t.w5)((()=>[(0,t.Wm)(v,{label:"用户名"},{default:(0,t.w5)((()=>[(0,t.Wm)(C,{modelValue:W.form.username,"onUpdate:modelValue":a[5]||(a[5]=e=>W.form.username=e),style:{width:"80%"}},null,8,["modelValue"])])),_:1}),(0,t.Wm)(v,{label:"昵称"},{default:(0,t.w5)((()=>[(0,t.Wm)(C,{modelValue:W.form.nickName,"onUpdate:modelValue":a[6]||(a[6]=e=>W.form.nickName=e),style:{width:"80%"}},null,8,["modelValue"])])),_:1}),(0,t.Wm)(v,{label:"年龄"},{default:(0,t.w5)((()=>[(0,t.Wm)(C,{modelValue:W.form.age,"onUpdate:modelValue":a[7]||(a[7]=e=>W.form.age=e),style:{width:"80%"}},null,8,["modelValue"])])),_:1}),(0,t.Wm)(v,{label:"性别"},{default:(0,t.w5)((()=>[(0,t.Wm)(D,{modelValue:W.form.sex,"onUpdate:modelValue":a[8]||(a[8]=e=>W.form.sex=e),label:"男"},{default:(0,t.w5)((()=>[h])),_:1},8,["modelValue"]),(0,t.Wm)(D,{modelValue:W.form.sex,"onUpdate:modelValue":a[9]||(a[9]=e=>W.form.sex=e),label:"女"},{default:(0,t.w5)((()=>[c])),_:1},8,["modelValue"]),(0,t.Wm)(D,{modelValue:W.form.sex,"onUpdate:modelValue":a[10]||(a[10]=e=>W.form.sex=e),label:"未知"},{default:(0,t.w5)((()=>[f])),_:1},8,["modelValue"])])),_:1}),(0,t.Wm)(v,{label:"地址"},{default:(0,t.w5)((()=>[(0,t.Wm)(C,{type:"textarea",modelValue:W.form.address,"onUpdate:modelValue":a[11]||(a[11]=e=>W.form.address=e),style:{width:"80%"}},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue"])])}var W=l(4471),y={name:"User",data(){return{search:"",currentPage:1,pageSize:5,total:10,tableData:[],form:{},dialogVisible:!1}},created(){this.load()},methods:{load(){W.Z.get("/user",{params:{pageNum:this.currentPage,pageSize:this.pageSize,search:this.search}}).then((e=>{this.tableData=e.data.records,this.total=e.data.total}))},save(){this.form.id?W.Z.put("/user",this.form).then((e=>{console.log(e),"0"==e.code?this.$message({type:"success",message:"更新成功"}):this.$message({type:"error",message:"更新失败"})})):W.Z.post("/user",this.form).then((e=>{console.log(e),"0"==e.code?this.$message({type:"success",message:"新增成功"}):this.$message({type:"error",message:"新增失败"})})),this.dialogVisible=!1,this.load()},add(){this.dialogVisible=!0,this.form={}},handleEdit(e){this.form=JSON.parse(JSON.stringify(e)),this.dialogVisible=!0},handleDelete(e){W.Z["delete"]("/user/"+e).then((e=>{"0"==e.code?this.$message({type:"success",message:"删除成功"}):this.$message({type:"error",message:"删除失败"})})),this.load()},handleSizeChange(e){this.pageSize=e,this.load()},handleCurrentChange(e){this.currentPage=e,this.load()}}},_=l(3744);const C=(0,_.Z)(y,[["render",k]]);var U=C}}]);
//# sourceMappingURL=781.d37b7c91.js.map