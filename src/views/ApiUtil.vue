<template>
  <div class="apiUtil">
    <el-form label-width="80px">
      <div class="title">请输入要操作的字符串：</div>
      <el-input type="textarea" v-model="in_str" :autosize="{minRows: 4,maxRows: 4}" style="width:100%;"></el-input>
      <div style="margin-bottom: 12px;margin-top: 12px;">
        <el-button type="primary" plain @click="base64Encode">Base64编码</el-button>
        <el-button type="primary" plain @click="base64Decode">Base64解码</el-button>
        <el-button type="primary" plain @click="md5Encry">MD5加密</el-button>
      </div>
      <el-input type="textarea" v-model="out_str" :autosize="{minRows: 4,maxRows: 4}" style="width:100%;"></el-input>
      <div class="title" style="margin-top: 12px; float: left">请输入正确的sql语句：</div>
      <i class="el-icon-info" style="margin-top: 15px; float: left; color: #73777e;" :title="title"></i>
      <el-input type="textarea" v-model="in_sql" :autosize="{minRows: 4,maxRows: 4}" style="width:100%;"></el-input>
      <div style="margin-bottom: 12px;margin-top: 12px;">
        <el-button type="primary" plain @click="generatePlainUrl">生成明文url</el-button>
        <el-button type="primary" plain @click="generateCipherUrl">生成密文url</el-button>
      </div>
      <el-input type="textarea" v-model="out_sql" :autosize="{minRows: 4,maxRows: 4}" style="width:100%;"></el-input>
    </el-form>
  </div>
</template>
<script>
let Base64 = require('js-base64').Base64;
export default {
  data() {
    return {
      title: "支持sql格式：\n 1:select * from table_name\n 2:select * from table_name where ...\n 3:select * from table_name where 1=1 order by xxx",
      in_str: "",
      out_str: "",
      in_sql: "",
      out_sql: "",
    };
  },
  created: function () {
    // 实例创建完之后调用
  },
  mounted: function () {
    // 挂载之后调用
    // 准备数据
  },
  methods: {
    base64Encode(){
      this.out_str = "";
      try {
        //运行代码
        this.out_str = Base64.encode(this.in_str);
      } catch(err) {
        //处理错误
        this.out_str = "编码失败";
      }
    },
    base64Decode(){
      this.out_str = "";
      try {
        //运行代码
        this.out_str = Base64.decode(this.in_str);
      } catch(err) {
        //处理错误
        this.out_str = "解码失败";
      }
    },
    md5Encry(){
      this.out_str = "";
      try {
        //运行代码
        this.out_str = this.$md5(this.in_str).toUpperCase().substring(8, 24);
      } catch(err) {
        //处理错误
        this.out_str = "加密失败";
      }
    },
    generatePlainUrl(){
      var preUrl = "http://localhost:8080/common/getDataByViewName?viewName=";
      this.out_sql = "";
      try {
        //运行代码
        var fromIndex = this.in_sql.toUpperCase().indexOf("FROM");
        var whereIndex = this.in_sql.toUpperCase().indexOf("WHERE");
        if(fromIndex == -1){
          this.out_sql = "sql错误";
          return;
        }
        if(whereIndex == -1){
          // 获取表名
          let table_name = this.in_sql.substring(fromIndex+4).replace(/(^\s*)|(\s*$)/g, "");
          this.out_sql = preUrl + table_name;
        }else{
          let table_name = this.in_sql.substring(fromIndex+4, whereIndex).replace(/(^\s*)|(\s*$)/g, "");
          this.out_sql = preUrl + table_name + "&condition=" + this.in_sql.substring(whereIndex+5).replace(/(^\s*)|(\s*$)/g, "");
        }
      } catch(err) {
        //处理错误
        this.out_sql = "生成失败";
      }
    },
    generateCipherUrl(){
      var preUrl = "http://localhost:8080/common/getDataByViewName?viewName=";
      this.out_sql = "";
      try {
        //运行代码
        var fromIndex = this.in_sql.toUpperCase().indexOf("FROM");
        var whereIndex = this.in_sql.toUpperCase().indexOf("WHERE");
        if(fromIndex == -1){
          this.out_sql = "sql错误";
          return;
        }
        if(whereIndex == -1){
          // 获取表名
          let table_name = Base64.encode(this.in_sql.substring(fromIndex+4).replace(/(^\s*)|(\s*$)/g, ""));
          this.out_sql = preUrl + table_name;
        }else{
          let table_name = Base64.encode(this.in_sql.substring(fromIndex+4, whereIndex).replace(/(^\s*)|(\s*$)/g, ""));
          let condition = Base64.encode(this.in_sql.substring(whereIndex+5).replace(/(^\s*)|(\s*$)/g, ""));
          this.out_sql = preUrl + table_name + "&condition=" + condition + "&key=" + this.$md5(condition).toUpperCase().substring(8, 24);
        }
      } catch(err) {
        //处理错误
        this.out_sql = "生成失败";
      }
    }
  },
};
</script>
<style lang="less" scoped>
.title {
  margin-bottom: 12px;
}
</style>
