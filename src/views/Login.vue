<template>
  <div class="login">
    <div class="bg">
      <div class="login-lay">
        <h2 class="login-hd">
          <i class="el-icon-platform-eleme" style="color: #304095; margin-right: 5px;"></i>公共接口数据权限管理
        </h2>
        <form action="">
          <div class="login-input">
            <p>
              <i class="el-icon-message" style="font-size: 16px;"></i>
              <span>邮箱</span>
            </p>
            <input type="text" placeholder="请输入登录邮箱" value="751670441@qq.com">
          </div>
          <div class="login-input">
            <p>
              <i class="el-icon-lock" style="font-size: 16px;"></i>
              <span>密码</span>
            </p>
            <input type="password" placeholder="请输入登密码" value="123456">
          </div>
          <router-link class="login-btn" to="/appManage" tag="div">登录</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../images/home/timg.jpg")
    no-repeat;
  background-size:100% 100%;
  .bg {
    position: relative;
    height: 100%;
    // background: rgba(73, 88, 169, 0.8);
    .login-lay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 390px;
      height: 410px;
      padding: 0 30px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 8px;
      .login-hd {
        text-align: center;
        height: 60px;
        line-height: 60px;
        margin-top: 16px;
        margin-bottom: 36px;
      }
      .login-input {
        margin-bottom: 10px;
        p {
          font-size: 14px;
          color: #10163a;
          font-weight: 600;
          line-height: 30px;
          span {
            margin-left: 6px;
          }
        }
        input {
          width: 100%;
          line-height: 30px;
          padding-left: 12px;
          box-sizing: border-box;
          border-radius: 4px;
          outline-style: none;
          border: none;
          border: 1px solid #ccc;
        }
      }
      .login-btn {
        width: 100%;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        background: #30419b;
        color: #fff;
        font-size: 12px;
        letter-spacing: 8px;
        margin-top: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
