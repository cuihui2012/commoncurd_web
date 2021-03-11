<template>
  <div class="apiComment">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="表/视图名称">
        <el-select v-model="select_view_value" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethodForSelectView" :loading="select_view_loading" style="width: 250px">
          <el-option v-for="item in select_view_options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="exportData">导出<i class="el-icon-download el-icon--right"></i></el-button>
    </el-form>
    <!-- 华丽分割线 -->
    <el-divider content-position="left" class="top_line"></el-divider>
    <el-table :data="gridDataForSelect">
      <el-table-column property="column_name" label="字段名称" width="200"></el-table-column>
      <el-table-column property="column_desc" label="字段描述" width="300"></el-table-column>
      <el-table-column property="data_type" label="字段类型" width="250"></el-table-column>
      <el-table-column property="data_length" label="字段长度" width="250"></el-table-column>
      <el-table-column property="nullable" label="可为空"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { export2Excel } from '../common/js/util'
export default {
  data() {
    return {
      select_view_value: "",
      // 下拉列表数据
      select_view_options: [],
      // 字段表格数据
      gridDataForSelect: [],
      // 表头数据
      columns: [{title:"字段名称",key:"column_name"},{title:"字段描述",key:"column_desc"},{title:"字段类型",key:"data_type"},{title:"字段长度",key:"data_length"},{title:"可为空",key:"nullable"},],
    };
  },
  watch: {
    // newVal,oldVal(固定参数) 新值,旧值
    select_view_value: function(newVal, oldVal) {
      this.getColumnsByViewName(newVal);
    },
  },
  created: function () {
    // 实例创建完之后调用
  },
  mounted: function () {
    // 挂载之后调用
    // 初始化数据
    this.getAllViewList("");
  },
  methods: {
    // 新增页view下拉列表的动态请求
    remoteMethodForSelectView(query) {
      if (query !== '') {
        this.select_view_loading = true;
        setTimeout(() => {
          this.select_view_loading = false;
          this.getAllViewList(query);
        }, 200);
      } else {
        this.getAllViewList("");
      }
    },
    // 获取所有视图列表
    getAllViewList(query) {
      // 先置空原列表
      this.select_view_options=[];
      // 发送请求
      this.$axios
        .get(
          "/auth/getAllViewList?pageSize=100&view_name=" + query
        )
        .then( response => {
          const results = response.data;
          if (results.code === "0001") {
            // 请求失败处理
            this.$message.error('获取列表失败');
            return;
          }
          if (results.data.data.length > 0) {
            results.data.data.forEach((result) => {
              this.select_view_options.push({
                'value': result, 
                'label': result
              })
            });
          }
        })
        .catch( error => {
          // 请求失败处理
          this.$message.error('请求应用列表数据失败');
        });
    },
    // 获取字段数据
    getColumnsByViewName(view_name){
      if(view_name == '' || view_name == null){
        return;
      }
      this.gridData = [];
      // 发送请求,获取字段列表
      this.$axios
        .get(
          "/auth/getViewColumnList?view_name=" + view_name
        )
        .then( response => {
          const results = response.data;
          if (results.code === "0001") {
            // 请求失败处理
            this.$message.error('获取列表失败');
            return;
          }
          this.gridDataForSelect = results.data;
        })
        .catch( error => {
          // 请求失败处理
          this.$message.error('请求应用列表数据失败');
        });

    },
    exportData(){
      export2Excel(this.columns,this.gridDataForSelect, "接口文档 - " + this.select_view_value);
    },
  },
}
</script>
<style lang="less" scoped>
</style>
