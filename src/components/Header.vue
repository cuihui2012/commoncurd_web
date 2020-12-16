<template>
  <el-header class="header">
    <h3>{{$t(title)}}</h3>
    <div class="hd-right">
      <el-select v-model="value" @change="getLang">
        <el-option label="中文" value="zh-CN"></el-option>
        <el-option label="English" value="en-US"></el-option>
      </el-select>
      <p>
        <i class="el-icon-lock"></i>
        {{$t('common.changePassword')}}
      </p>
      <p>
        <i class="el-icon-switch-button"></i>
        {{$t('common.logOut')}}
      </p>
      <div class="hd-user">
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3147328226,3569316785&fm=26&gp=0.jpg"
          alt=""
        >
        <span>Anady</span>
      </div>
    </div>
  </el-header>
</template>
<script>
import common from "../assets/common.js";
export default {
  data() {
    return {
      value: "中文",
      title: "common.appManageName"
    };
  },
  created() {
    this.bbtn();
  },
  methods: {
    getLang(value) {
      this.$i18n.locale = value;
    },
    bbtn: function() {
      common.$on("myFun", message => {
        //这里最好用箭头函数，不然this指向有问题
        this.title = message;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-select {
  max-width: 100px;
}
.header {
  height: 66px;
  line-height: 66px;
  padding: 0 50px 0 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .hd-right {
    display: flex;
    p {
      font-size: 14px;
      display: inline-block;
      margin-left: 30px;
      cursor: pointer;
    }
    .hd-user {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0 6px 0 50px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
</style>

