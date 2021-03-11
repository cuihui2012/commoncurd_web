<template>
  <el-aside width="226px" class="aside">
    <p class="logo">
      <i class="el-icon-platform-eleme" style="color: rgb(48, 64, 149);margin-right: 5px;"></i>数据权限管理
    </p>
    <el-menu
      router
      default-active="/appManage"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#202020"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        v-for="menu in navTab"
        :key="menu.id"
        :index="menu.url"
        :title="menu.title"
        @click="checked"
      >
        <i :class="menu.icon"></i>
        <span slot="title">{{$t(menu.title)}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
import common from "../assets/common.js";
export default {
  name: "Aside",
  data() {
    return {
      navTab: [
        {
          id: 1,
          url: "/appManage",
          icon: "el-icon-menu",
          title: "common.appManageName"
        },
        {
          id: 2,
          url: "/dataAuthManage",
          icon: "el-icon-s-data",
          title: "common.dataAuthManageName"
        },
        {
          id: 3,
          url: "/apiUtil",
          icon: "el-icon-s-tools",
          title: "common.apiUtilName"
        },
        {
          id: 4,
          url: "/apiComment",
          icon: "el-icon-folder",
          title: "common.apiCommentName"
        },
        {
          id: 5,
          url: "/apiLog",
          icon: "el-icon-tickets",
          title: "common.ApiLogName"
        }
      ],
      navTitle: ""
    };
  },
  methods: {
    checked: function(e) {
      let _this = this;
      _this.navTitle = e.$attrs.title
      //$emit这个方法会触发一个事件
      common.$emit("myFun", _this.navTitle);
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
}
.el-menu-item,
.el-submenu__title {
  height: 44px;
  line-height: 44px;
}
.el-menu-item {
  i {
    color: #7b87d1;
  }
}
.aside {
  background: #202020;
  .logo {
    font-size: 24px;
    line-height: 105px;
    text-align: center;
    color: #fff;
  }
}
</style>
