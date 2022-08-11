<template>
  <div class="login">
    <p>欢迎登陆</p>
    <div>
      <van-cell-group inset>
        <van-field v-model="phone" type="tel" label="请输入手机号" />
        <van-field v-model="password" type="password" label="请输入密码" />
      </van-cell-group>
    </div>

    <div class="btnLogin">
      <van-button color="#000" plain @click="Login"> 登陆 </van-button>
    </div>
  </div>
</template>
<script>
import { getLoginUser } from "@/request/api/home";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    async Login() {
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password,
      });
      if (res.data.code === 200) {
        this.$store.commit("updateIsLogin", true);
        this.$store.commit("updateToken", res.data.token);
        let result = await getLoginUser(res.data.account.id);
        this.$store.commit("updateUser", result);
        this.$router.replace("/infoUser");
      } else {
        alert("手机号码或者密码错误");
        this.password = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 20rem;
  background-color: rgb(235, 94, 94);
  position: relative;
  text-align: center;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    font-size: 1rem;
    color: white;
  }
  .btnLogin {
    display: flex;
    height: 3rem;
    align-items: center;
    justify-content: center;
  }
}
</style>
