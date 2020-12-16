<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="请选择应用IP地址">
        <el-select v-model="iid_value" filterable remote reserve-keyword clearable placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="addViewData">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 华丽分割线 -->
    <el-divider content-position="left" class="top_line"></el-divider>
    <!-- 授权视图信息 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="vid" label="主键" width="100" v-if="false"></el-table-column>
      <el-table-column prop="iid" label="外键" width="100" v-if="false"></el-table-column>
      <el-table-column prop="ip_address" label="应用IP地址" width="200"></el-table-column>
      <el-table-column prop="view_name" label="视图名称" width="300"></el-table-column>
      <el-table-column prop="view_desc" label="视图描述" width="300"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="300"></el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
          <el-button @click="editViewData(scope.row)" type="text" size="medium">
            <i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button @click="deleteViewData(scope.row)" type="text" size="medium">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>
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
    <!-- 编辑视图字段表格数据 -->
    <el-dialog :title="edit_title" :visible.sync="dialogTableVisible"  width="65%">
      <el-table :data="gridData">
        <el-table-column property="cid" label="字段主键" width="100" v-if="false"></el-table-column>
        <el-table-column property="vid" label="视图主键" width="100" v-if="false"></el-table-column>
        <el-table-column property="column_name" label="字段名称" width="150"></el-table-column>
        <el-table-column property="column_desc" label="字段描述" width="150"></el-table-column>
        <el-table-column property="data_type" label="字段类型" width="100"></el-table-column>
        <el-table-column property="data_length" label="字段长度" width="100"></el-table-column>
        <el-table-column property="nullable" label="可为空" width="100"></el-table-column>
        <el-table-column property="auth_flag" label="权限标志" width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.auth_flag" placeholder="请选择" filterable allow-create @change='changeSelect(scope.row)'>
            <el-option v-for="item in authList " :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column property="update_time" label="更新时间"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 新增视图字段表格数据 -->
    <el-dialog :visible.sync="dialogAddVisible"  width="65%">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="授权IP地址">
          <el-select v-model="add_iid_value" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethodForAddIid" :loading="add_iid_loading" style="width: 250px">
            <el-option v-for="item in add_iid_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权视图名称">
          <el-select v-model="add_view_value" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethodForAddView" :loading="add_view_loading" style="width: 250px">
            <el-option v-for="item in add_view_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 华丽分割线 -->
      <el-divider content-position="left" class="top_line"></el-divider>
      <el-table :data="gridDataForAdd">
        <el-table-column property="column_name" label="字段名称" width="200"></el-table-column>
        <el-table-column property="column_desc" label="字段描述" width="200"></el-table-column>
        <el-table-column property="data_type" label="字段类型" width="180"></el-table-column>
        <el-table-column property="data_length" label="字段长度" width="100"></el-table-column>
        <el-table-column property="nullable" label="可为空" width="100"></el-table-column>
        <el-table-column property="auth_flag" label="权限标志" width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.auth_flag" placeholder="请选择" filterable allow-create>
            <el-option v-for="item in authList " :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitViewData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 下拉列表数据
      options: [],
      iid_value: "",
      loading: false,
      // 下拉列表数据(新增页iid)
      add_iid_options: [],
      add_iid_value: "",
      add_iid_loading: false,
      // 下拉列表数据(新增页view)
      add_view_options: [],
      add_view_value: "",
      add_view_loading: false,
      // 视图表格数据
      tableData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 字段表格数据控制标志
      dialogTableVisible: false,
      // 编辑弹框头
      edit_title: "",
      // 新增表格控制标志
      dialogAddVisible: false,
      // 字段表格数据
      gridData:[],
      // 字段表格数据(新增页)
      gridDataForAdd: [],
      // 权限下拉列表
      authList: [
        {"label":"U 权限","value":"U"},
        {"label":"C 权限","value":"C"},
        {"label":"禁止使用","value":"N"}
      ],
      // 获取当前操作的试图ID
      handleVid: "",
    };
  },
  watch: {
    // newVal,oldVal(固定参数) 新值,旧值
    iid_value: function(newVal, oldVal) {
      this.getIPViewList(newVal);
    },
    add_view_value: function(newVal, oldVal) {
      this.getColumnsByViewName(newVal);
    },
  },
  created: function () {
    // 实例创建完之后调用
  },
  mounted: function () {
    // 挂载之后调用
    // 初始化数据
    this.getIPConfigList("");
    this.getIPViewList("");
  },
  methods: {
    // 首页下拉列表的动态请求
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.getIPConfigList(query);
        }, 200);
      } else {
        this.getIPConfigList("");
      }
    },
    // 新增页iid下拉列表的动态请求
    remoteMethodForAddIid(query) {
      if (query !== '') {
        this.add_iid_loading = true;
        setTimeout(() => {
          this.add_iid_loading = false;
          this.getIPConfigListForAdd(query);
        }, 200);
      } else {
        this.getIPConfigListForAdd("");
      }
    },
    // 新增页view下拉列表的动态请求
    remoteMethodForAddView(query) {
      if (query !== '') {
        this.add_view_loading = true;
        setTimeout(() => {
          this.add_view_loading = false;
          this.getAllViewList(query);
        }, 200);
      } else {
        this.getAllViewList("");
      }
    },
    // 获取所有视图列表
    getAllViewList(query) {
      // 先置空原列表
      this.add_view_options=[];
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
              this.add_view_options.push({
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
    // 获取所有IP列表(服务于首页下拉框)
    getIPConfigList(query) {
      // 先置空原列表
      this.options=[];
      // 发送请求
      this.$axios
        .get(
          "/auth/getIPConfigList?pageSize=100&ipAddress=" + query
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
              this.options.push({
                'value': result.iid, 
                'label': result.ip_address
              })
            });
          }
        })
        .catch( error => {
          // 请求失败处理
          this.$message.error('请求应用列表数据失败');
        });
    },
    // 获取所有IP列表(服务于新增页)
    getIPConfigListForAdd(query) {
      // 先置空原列表
      this.add_iid_options=[];
      // 发送请求
      this.$axios
        .get(
          "/auth/getIPConfigList?pageSize=100&ipAddress=" + query
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
              this.add_iid_options.push({
                'value': result.iid, 
                'label': result.ip_address
              })
            });
          }
        })
        .catch( error => {
          // 请求失败处理
          this.$message.error('请求应用列表数据失败');
        });
    },
    getIPViewList(iid){
      // 发送请求
      this.$axios
        .get(
          "/auth/getIPViewList?iid=" + iid +
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
    // 分页插件方法
    handleSizeChange(val) {
      // 改变每页多少条
      this.pageSize = val;
      this.getIPViewList(this.iid_value);
    },
    handleCurrentChange(val) {
      // 改变当前页
      this.currentPage = val;
      this.getIPViewList(this.iid_value);
    },
    // 删除视图数据
    deleteViewData(row) {
      this.$confirm('此操作将级联删除该视图所有权限配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          // 发送请求
          this.$axios
            .get("/auth/deleteViewConfigInfo?vid=" + row.vid)
            .then( response => {
              const results = response.data;
              if (results.code === "0001") {
                // 失败处理
                this.$message.error('删除失败');
                return;
              } else {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getIPViewList(this.iid_value);
              }
            })
            .catch( error => {
              // 请求失败处理
              this.$message.error('请求失败');
            })
        }
      );
    },
    // 编辑视图数据
    editViewData(row){
      this.dialogTableVisible = true;
      // 给操作的vid赋值,后续修改用到
      this.handleVid = row.vid;
      this.gridData = [];
      // 弹框头赋值
      this.edit_title = row.ip_address + "  -  " + row.view_name;
      // 发送请求,获取字段列表
      this.$axios
        .get(
          "/auth/getViewColumnList?vid=" + row.vid +
          "&view_name=" + row.view_name
        )
        .then( response => {
          const results = response.data;
          if (results.code === "0001") {
            // 请求失败处理
            this.$message.error('获取列表失败');
            return;
          }
          this.gridData = results.data;
        })
        .catch( error => {
          // 请求失败处理
          this.$message.error('请求应用列表数据失败');
        });

    },
    addViewData(){
      this.dialogAddVisible = true;
      this.add_iid_value = "";
      this.add_view_value = "";
      this.gridDataForAdd = [];
      this.getIPConfigListForAdd("");
      this.getAllViewList("");
    },
    changeSelect(row){
      // 新增字段时,row.vid为空,需赋值
      row.vid = this.handleVid;
      // 发送请求
      this.$axios
        .post("/auth/addOrUpdateColumnConfigInfo", row)
        .then(response => {
          const results = response.data;
          if (results.code == "0000") {
            // 成功后修改状态
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          } else {
            this.$message.error('操作失败');
          }
        })
        .catch(error => {
          // 请求失败处理
          this.$message.error('请求失败');
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
          this.gridDataForAdd = results.data;
        })
        .catch( error => {
          // 请求失败处理
          this.$message.error('请求应用列表数据失败');
        });

    },
    // 新增数据提交
    submitViewData(){
      // 字段权限给默认值
      this.gridDataForAdd.forEach((result) => {
        if(result.auth_flag == null || result.auth_flag == ''){
          result.auth_flag = "N";
        }
      });
      var param = {
        iid: this.add_iid_value,
        view_name: this.add_view_value,
        columns: this.gridDataForAdd
      }
      // 发送请求
      this.$axios
          .post("/auth/addViewConfigInfo", param)
          .then(response => {
            const results = response.data;
            if (results.code == "0000") {
              // 成功后修改状态
              this.$message({
                message: results.desc,
                type: 'success'
              });
              this.dialogAddVisible = false;
              // 新增成功刷新列表
              this.getIPViewList(this.iid_value);
            } else {
              this.$message.error(results.desc);
            }
          })
          .catch(error => {
            // 请求失败处理
            this.$message.error('请求失败');
          });
    }
  },
};
</script>
<style lang="less" scoped>
.page_plug {
  float: right;
  margin-top: 12px;
}
</style>

