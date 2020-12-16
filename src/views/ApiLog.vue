<template>
  <div class="apiLog">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="应用IP地址">
        <el-input
          v-model="ip_address"
          placeholder="请输入应用IP地址"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="接口URI">
        <el-input
          v-model="uri_path"
          placeholder="请输入接口URI"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 华丽分割线 -->
    <el-divider content-position="left" class="top_line"></el-divider>
    <!-- 日志表格数据 -->
    <el-table :data="tableData" stripe style="width: 100%" :row-style="{height: '65px'}">
      <el-table-column prop="lid" label="主键" width="100" v-if="false"></el-table-column>
      <el-table-column prop="ip_address" label="应用IP地址" width="150"></el-table-column>
      <el-table-column prop="uri_path" label="URI地址" width="200"></el-table-column>
      <el-table-column prop="url_path" label="URL地址" width="300"></el-table-column>
      <el-table-column prop="method" label="请求类型" width="100"></el-table-column>
      <el-table-column prop="param_follow" label="链接参数" width="300"></el-table-column>
      <el-table-column prop="param_all" label="完整参数" width="300"></el-table-column>
      <el-table-column prop="update_time" label="请求时间" width="220"></el-table-column>
    </el-table>
    <!-- 分页插件 -->
    <div class="page_plug">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 输入框数据
      ip_address: "",
      uri_path: "",
      // 输入框数据-用于点击分页时输入框数据变化引起的数据不准确
      in_ip_address: "",
      in_uri_path: "",
      tableData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created: function () {
    // 实例创建完之后调用
  },
  mounted: function () {
    // 挂载之后调用
    // 准备数据
    this.getApiLogList('','');
  },
  methods: {
    getApiLogList(ip_address, uri_path){
      // 发送请求
      this.$axios
        .get(
          "/log/getApiLogList?ip_address=" + ip_address +
          "&uri_path=" +
          uri_path +
          "&recordPerPage=" +
          this.pageSize +
          "&curPage=" +
          this.currentPage
        )
        .then( response => {
          const results = response.data;
          if (results.code === "0001") {
            // 请求失败处理
            this.$message.error('获取列表失败');
            return;
          }
          this.tableData = results.data.data;
          this.total = results.data.recordNumbers;
        })
        .catch( error => {
          // 请求失败处理
          this.$message.error('请求应用列表数据失败');
        });
    },
    onSearch(){
      this.tableData = [];
      // 重置初始值
      this.pageSize = 10;
      this.currentPage = 1;
      this.in_ip_address = this.ip_address;
      this.in_uri_path = this.uri_path;
      this.getApiLogList(this.ip_address, this.uri_path);
    },
    // 分页插件方法
    handleSizeChange(val) {
      // 改变每页多少条
      this.pageSize = val;
      this.getApiLogList(this.in_ip_address, this.in_uri_path);
    },
    handleCurrentChange(val) {
      // 改变当前页
      this.currentPage = val;
      this.getApiLogList(this.in_ip_address, this.in_uri_path);
    },
  },
};
</script>
<style lang="less" scope>
.page_plug {
  float: right;
  margin-top: 12px;
}
</style>