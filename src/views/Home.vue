<template>
  <el-container class="home">
    <Aside></Aside>
    <el-container class="content">
      <Header></Header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .content {
    flex-direction: column;
  }
  .el-main {
    background: #f9f9f9;
    box-shadow: inset 0 2px 2px  #ccc;
    padding: 18px 32px;
  }
}
</style>
<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
export default {
  name: "Home",
  components: {
    Aside,
    Header
  }
};
</script>
