<template>
  <div class="appmanage">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="应用IP地址">
        <el-input
          v-model="formInline.ipAddress"
          placeholder="请输入应用IP地址"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 华丽分割线 -->
    <el-divider content-position="left" class="top_line"></el-divider>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        prop="iid"
        label="主键"
        width="100"
        v-if="false"
      ></el-table-column>
      <el-table-column
        prop="ip_address"
        label="应用IP地址"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="ip_desc"
        label="应用描述"
        width="200"
      ></el-table-column>
      <el-table-column prop="option" label="使用标志" width="200">
        <template slot-scope="scope">
          <el-switch
            on-text="是"
            off-text="否"
            on-color="#5B7BFA"
            off-color="#dadde5"
            v-model="scope.row.is_used_switch"
            @change="changeIsUsedSwitch(scope.$index, scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="option" label="一键授权" width="200">
        <template slot-scope="scope">
          <el-switch
            on-text="是"
            off-text="否"
            on-color="#5B7BFA"
            off-color="#dadde5"
            v-model="scope.row.is_opend_switch"
            @change="changeIsOpendSwitch(scope.$index, scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间"
        width="200"
      ></el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
          <el-button @click="editData(scope.row)" type="text" size="medium">
            <i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button @click="deleteData(scope.row)" type="text" size="medium">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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

    <el-dialog title="应用编辑" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="formRules">
        <el-form-item label="应用ID" :label-width="formLabelWidth" prop="iid">
          <el-input v-model="form.iid" autocomplete="off" placeholder = "后台自动生成" disabled></el-input>
        </el-form-item>
        <el-form-item label="应用IP地址" :label-width="formLabelWidth" prop="ip_address">
          <el-input v-model="form.ip_address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用描述" :label-width="formLabelWidth" prop="ip_desc">
          <el-input v-model="form.ip_desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用标志" :label-width="formLabelWidth" prop="is_used" v-if="add_flag">
          <el-switch
            on-text="是"
            off-text="否"
            on-color="#5B7BFA"
            off-color="#dadde5"
            v-model="form.is_used_switch"
          ></el-switch>
        </el-form-item>
        <el-form-item label="一键授权" :label-width="formLabelWidth" prop="is_opend" v-if="add_flag">
          <el-switch
            title="打开：免授权 关闭：需授权"
            on-text="是"
            off-text="否"
            on-color="#5B7BFA"
            off-color="#dadde5"
            v-model="form.is_opend_switch"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="validateForm('formRules')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      formInline: {
        ipAddress: "",
      },
      submit_formInline: {
        ipAddress: "",
      },
      // 编辑数据
      dialogFormVisible: false,
      form: {
        iid: "",
        ip_address: "",
        ip_desc: "",
        is_used: "",
        is_used_switch: true,
        is_opend: "",
        is_opend_switch: false,
      },
      rules: {
        ip_address: [
          { required: true, message: "请输入应用IP地址", trigger: "blur" }
        ],
        ip_desc: [{ required: true, message: "请输入应用描述", trigger: "blur" }]
      },
      formLabelWidth: "100px",
      // 新增/编辑标志
      add_flag: false,
    };
  },
  watch: {
    // newVal,oldVal(固定参数) 新值,旧值
    dialogFormVisible: function(newVal, oldVal) {
      this.$refs["formRules"].resetFields();
    },
  },
  created: function () {
    // 实例创建完之后调用
  },
  mounted: function () {
    // 挂载之后调用
    // 准备数据
    this.getIPConfigList();
  },
  methods: {
    async onSubmit() {
      // 点击分页会使用到该参数
      this.submit_formInline["ipAddress"] = this.formInline["ipAddress"];
      // 重置初始值
      this.pageSize = 10;
      this.currentPage = 1;
      this.getIPConfigList();
    },
    async getIPConfigList() {
      var results = [];
      // 发送请求
      await this.$axios
        .get(
          "/auth/getIPConfigList?ipAddress=" +
            this.submit_formInline["ipAddress"] +
            "&recordPerPage=" +
            this.pageSize +
            "&curPage=" +
            this.currentPage
        )
        .then((response) => (results = response.data))
        .catch(function (error) {
          // 请求失败处理
          this.$message.error('请求应用列表数据失败');
        });
      if (results.code === "0001") {
        // 请求失败处理
        this.$message.error('获取列表失败');
        return;
      }
      if (results.data.data.length > 0) {
        results.data.data.forEach((result) => {
          if (result["is_used"] == "0") {
            result["is_used_switch"] = false;
          } else {
            result["is_used_switch"] = true;
          }
          if (result["is_opend"] == "0") {
            result["is_opend_switch"] = false;
          } else {
            result["is_opend_switch"] = true;
          }
        });
      }
      this.tableData = results.data.data;
      this.total = results.data.recordNumbers;
    },
    handleSizeChange(val) {
      // 改变每页多少条
      this.pageSize = val;
      this.getIPConfigList();
    },
    handleCurrentChange(val) {
      // 改变当前页
      this.currentPage = val;
      this.getIPConfigList();
    },
    async changeIsUsedSwitch(index, row) {
      var results = "";
      var msg = row.is_used_switch ? "开启" : "关闭";
      // 发送请求
      var param = {
        iid: row.iid,
        ip_address: row.ip_address,
        ip_desc: row.ip_desc,
        is_opend: row.is_opend,
        is_used: row.is_used == "0" ? "1" : "0",
      };
      var _this = this;
      await this.$axios
        .post("/auth/addOrUpdateIPConfigInfo", param)
        .then((response) => (results = response.data))
        .catch(function (error) {
          // 请求失败处理
          row.is_used_switch = !row.is_used_switch;
          _this.$message.error('请求失败');
        });
      if (results.code == "0000") {
        // 成功后修改状态
        row.is_used = row.is_used == "0" ? "1" : "0";
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      } else {
        this.$message.error('操作失败');
        row.is_used_switch = !row.is_used_switch;
      }
    },
    async changeIsOpendSwitch(index, row) {
      var results = "";
      var msg = row.is_opend_switch ? "开启" : "关闭";
      // 发送请求
      var param = {
        iid: row.iid,
        ip_address: row.ip_address,
        ip_desc: row.ip_desc,
        is_opend: row.is_opend == "0" ? "1" : "0",
        is_used: row.is_used,
      };
      var _this = this;
      await this.$axios
        .post("/auth/addOrUpdateIPConfigInfo", param)
        .then((response) => (results = response.data))
        .catch(function (error) {
          // 请求失败处理
          row.is_opend_switch = !row.is_opend_switch;
          _this.$message.error('请求失败');
        });
      if (results.code == "0000") {
        // 成功后修改状态
        row.is_opend = row.is_opend == "0" ? "1" : "0";
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      } else {
        this.$message.error('操作失败');
        row.is_opend_switch = !row.is_opend_switch;
      }
    },
    editData(row) {
      this.dialogFormVisible = true;
      this.add_flag = false;
      this.form = JSON.parse(JSON.stringify(row));
    },
    addData() {
      // 表单数据重置
      this.form.iid = "";
      this.form.ip_address = "";
      this.form.ip_desc = "";
      this.form.is_used = "";
      this.form.is_used_switch = true;
      this.form.is_opend = "";
      this.form.is_opend_switch = false;
      // 使用标志/开放标志需要显现
      this.add_flag = true;
      this.dialogFormVisible = true;
    },
    validateForm(formRules) {
      this.$refs[formRules].validate(valid => {
        if (valid) {
          this.submitForm();
        } else {
          return false;
        }
      });
    },
    async submitForm() {
      // 格式化form值,适配新增操作
      this.form.is_opend = this.form.is_opend_switch?"1":"0";
      this.form.is_used = this.form.is_used_switch?"1":"0";
      var results = "";
      await this.$axios
        .post("/auth/addOrUpdateIPConfigInfo", this.form)
        .then(response => (results = response.data))
        .catch(function(error) {
          // 请求失败处理
          this.$message.error('请求失败');
        });
      if (results.code == "0000") {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.getIPConfigList();
      } else {
        this.$message.error('操作失败');
      }
      this.dialogFormVisible = false;
    },
    deleteData(row) {
      this.$confirm('此操作将级联删除该应用所有权限配置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
        async () => {
          const result = await this.$axios.get("/auth/deleteIPConfigInfo?iid=" + row.iid);
          if (result.data.code == "0000") {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getIPConfigList();
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            });
          }
        });
    },
  },
};
</script>
<style lang="less" >
.page_plug {
  float: right;
  margin-top: 12px;
}
</style>