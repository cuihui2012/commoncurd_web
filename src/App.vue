<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>


<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
}
p,
div,
h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  widows: 100%;
  height: 100%;
  box-sizing: border-box;
}

.el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  text-align: center;
  
}
</style>
