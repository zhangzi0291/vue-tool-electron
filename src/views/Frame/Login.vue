<style lang="less" scoped>
.login-box {
  padding: 0 15px;
}

.unlogin {
  cursor: pointer;
}
.lr-box{
  position: relative;
}
.login-title{
  font-weight: bold;
  display: inline-block;
}
.change-title{
  font-weight: bold;
}
</style>
<template>
  <div class="login-box">
    <div v-if="!isLogin" class="unlogin" @click="login">
      登录
    </div>
    <div v-else>
      <a-dropdown :trigger="['click']">
        <div>
          {{$store.state.user.nickname}}
          <DownOutlined/>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="logout()">
              <a-button shape="circle" type="link">
                注销
                <template #icon>
                  <LogoutOutlined/>
                </template>
              </a-button>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <a-modal v-model:visible="showLogin" centered :footer="null" :forceRender="true">
      <template #title>
        <div class="login-title">{{ isRegister?"注册":"登录" }}</div>
        <a-button type="link" @click="changeRegister">{{ isRegister?"登录":"注册" }}</a-button>
<!--        <div class="change-title" @click="changeRegister">{{ isRegister?"登录":"注册" }}</div>-->
      </template>
      <a-card :bordered="false">
        <a-form v-if="!isRegister"  ref="loginForm" :model="loginData" :rules="loginRules" hideRequiredMark v-bind="layout">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="loginData.username"/>
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="loginData.password" autocomplete="off" type="password"/>
          </a-form-item>
          <a-form-item label="验证码" name="genId">
            <gen-slider @valid="valid"></gen-slider>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button type="primary" block @click="doLogin">登录</a-button>
          </a-form-item>
        </a-form>

        <a-form v-else ref="registerForm" :model="registerData" :rules="registerRules" v-bind="layout">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="registerData.username"/>
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="registerData.password" autocomplete="off" type="password"/>
          </a-form-item>
          <a-form-item label="昵称" name="nickname">
            <a-input v-model:value="registerData.nickname"/>
          </a-form-item>
          <a-form-item label="手机号" name="phone">
            <a-input v-model:value="registerData.phone"/>
          </a-form-item>
          <a-form-item label="邮箱" name="email">
            <a-input v-model:value="registerData.email"/>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }">
            <div class="button-group">
              <a-button type="primary" block @click="doRegister">注册</a-button>
            </div>
          </a-form-item>
        </a-form>
      </a-card>
    </a-modal>

  </div>
</template>
<script lang="ts">

import { AxiosResponse } from "axios";
import {defineComponent} from "vue";
import GenSlider from "@/components/GenSlider.vue";
import {App} from "@/api/SysLoginApi";


interface RegisterData {
  username: string | undefined;
  password: string | undefined;
  nickname: string | undefined;
  phone: number | undefined;
  email: string | undefined;
}


interface LoginData {
  username: string;
  password: string;
  redirect: string;
  hash: string;
  genId: string;
}

export default defineComponent({
  name: 'Login',
  components:{
    GenSlider
  },
  data() {
    return {
      isValid: false,
      isLogin: !!this.$store.state.user.nickname,
      isRegister: false,
      showLogin: false,
      loginData: {} as LoginData,
      registerData: {} as RegisterData,
      tmpPwd:"",
      layout: {
        labelCol: {span: 6},
        wrapperCol: {span: 16},
      },
      loginRules: {
        username: [{required: true, type: 'string', trigger: 'blur', message: "用户名不可为空"}],
        password: [{required: true, type: 'string', trigger: 'blur', message: "密码不可为空"}],
        genId: [{required: true, type: 'string', trigger: 'blur', message: "需要校验"}],
      },
      registerRules: {
        username: [{required: true, type: 'string', trigger: 'blur', message: "用户名不可为空"}],
        password: [{required: true, type: 'string', trigger: 'blur', message: "密码不可为空"}],
        nickname: [{required: true, type: 'string', trigger: 'blur', message: "昵称不可为空"}],
        phone: [
          {required: true, type: 'string', trigger: 'blur', message: "手机号不可为空"},
          {
            type: 'number', trigger: 'blur', message: "只能是数字", transform: (value: string) => {
              return Number(value)
            }
          },
        ],
        email: [
          {required: true, type: 'string', trigger: 'blur', message: "邮箱不可为空"},
          {type: 'email', trigger: 'blur', message: "邮箱不符合规则"},
        ],
      },
    }
  },
  methods: {
    login() {
      this.showLogin = true
    },
    logout() {
      this.$api.SysLoginApi.logout().then(() => {
        this.isLogin = false
      })
    },
    changeRegister(){
      this.isRegister = !this.isRegister
    },
    doLogin(){
      const loginForm: any = this.$refs.loginForm
      loginForm.validate().then(() => {
        let data=this.loginData
        this.tmpPwd = data.password;

        this.$api.SysLoginApi.login(data).then((userData:any) => {
          this.$message.success("登录成功")
          data.password = this.tmpPwd;
          this.isLogin = true
          this.showLogin = false
          //超时时间提前1小时，避免token过期
          const timeout = new Date().getTime()+userData.timeout - (1000*60*60)
          this.$store.commit('setLoginTimeout',timeout)
          this.$store.commit('setUser',userData.user)
          this.$store.commit('setApp',userData.app)
          console.log(userData)
        }).catch(() => {
          data.password = this.tmpPwd;
        });
      })
    },
    doRegister(){
      const registerForm: any = this.$refs.registerForm
      registerForm.validate().then(() => {
        let data=this.registerData
        // SysLoginApi.register(data).then((res: AxiosResponse) => {
        //   this.isLogin = true
        //   this.$message.success("注册成功")
        // })
      })
    },
    valid(valid:any) {
      if (valid) {
        this.isValid = true
        this.loginData.genId = valid
      } else {
        this.isValid = false
      }
    }
  },
  mounted() {
    if(this.isLogin){
      this.$api.SysLoginApi.isLogin().then((res)=>{
        if(res.data.data == 'false'){
          this.isLogin = false
          this.$store.commit('setLoginTimeout',0)
          this.$store.commit('setUser', {})
        }
      })
    }

  }
})
</script>