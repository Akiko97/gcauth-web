<template>
  <div class="auth">
    <el-container>
      <el-header>
        <el-radio-group v-model="mode" size="large">
          <el-radio-button label="Register" />
          <el-radio-button label="Login" />
          <el-radio-button label="ChangePassword" />
        </el-radio-group>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="6"><!-- Nothing --></el-col>
          <el-col :span="12">
            <div class="register-table" v-if="mode=='Register'">
              <el-form :model="form_register" label-width="20%">
                <el-form-item label="UserName">
                  <el-input v-model="form_register.name" />
                </el-form-item>
                <el-form-item label="Password">
                  <el-input v-model="form_register.pw" type="password" show-password />
                </el-form-item>
                <el-form-item label="Re-type Password">
                  <el-input v-model="form_register.rpw" type="password" show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width: 100%" @click="register_submit()">Register</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="login-table" v-if="mode=='Login'">
              <el-form :model="form_login" label-width="20%">
                <el-form-item label="UserName">
                  <el-input v-model="form_login.name" />
                </el-form-item>
                <el-form-item label="Password">
                  <el-input v-model="form_login.pw" type="password" show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width: 100%" @click="login_submit()">Login</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="changepw-table" v-if="mode=='ChangePassword'">
              <el-form :model="form_changepw" label-width="20%">
                <el-form-item label="UserName">
                  <el-input v-model="form_changepw.name" />
                </el-form-item>
                <el-form-item label="Old Password">
                  <el-input v-model="form_changepw.old_pw" type="password" show-password />
                </el-form-item>
                <el-form-item label="New Password">
                  <el-input v-model="form_changepw.new_pw" type="password" show-password />
                </el-form-item>
                <el-form-item label="Re-type Password">
                  <el-input v-model="form_changepw.new_rpw" type="password" show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width: 100%" @click="changepw_submit()">Change Password</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="6"><!-- Nothing --></el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AuthComponent'
});
</script>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import type { Action } from 'element-plus'
import axios from 'axios'
import server from '@/config'
const mode = ref('Register');
const form_register = reactive({
  name: '',
  pw: '',
  rpw: ''
});
const form_login = reactive({
  name: '',
  pw: ''
});
const form_changepw = reactive({
  name: '',
  old_pw: '',
  new_pw: '',
  new_rpw: ''
});
const check_server = (success: ()=>(void)) => {
  axios.get(`${server.http}://${server.domain}:${server.port}/authentication/type`)
  .then((response) => {
    if (response.data == 'GCAuthAuthenticationHandler') {
      success()
    }
    else {
      ElNotification({
        title: 'Error',
        message: 'Unknown error, please check the GCAuth plugin.',
        type: 'error',
      })
    }
  })
  .catch((error) => {
    if (error.code == 'ERR_NETWORK') {
      ElNotification({
        title: 'Error',
        message: 'Server is not ready for registering, please check the server or CORS policy.',
        type: 'error',
      })
    }
    else {
      ElNotification({
        title: 'Error',
        message: 'Unknown error, please check the internet',
        type: 'error',
      })
    }
  })
}
const register_submit = () => {
  if (form_register.pw != form_register.rpw) {
    ElMessageBox.alert('Password is different, Please check your password!', 'Error', {
      confirmButtonText: 'OK',
      callback: (action: Action) => {
        ElMessage({
          showClose: true,
          message: 'Oops, registration failed.',
          type: 'error',
        })
      }
    })
  }
  else {
    check_server(() => {
      const data = JSON.stringify({
        username: form_register.name,
        password: form_register.pw,
        password_confirmation: form_register.rpw
      })
      axios.post(`${server.http}://${server.domain}:${server.port}/authentication/register`, data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }
};
const login_submit = () => {
  check_server(() => {
    const data = JSON.stringify({
      username: form_login.name,
      password: form_login.pw
    })
    axios.post(`${server.http}://${server.domain}:${server.port}/authentication/login`, data)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  })
};
const changepw_submit = () => {
  if (form_register.pw != form_register.rpw) {
    ElMessageBox.alert('Password is different, Please check your password!', 'Error', {
      confirmButtonText: 'OK',
      callback: (action: Action) => {
        ElMessage({
          showClose: true,
          message: 'Oops, failed to change password.',
          type: 'error',
        })
      }
    })
  }
  else {
    check_server(() => {
      const data = JSON.stringify({
        username: form_changepw.name,
        new_password: form_changepw.new_pw,
        new_password_confirmation: form_changepw.new_rpw,
        old_password: form_changepw.old_pw
      })
      axios.post(`${server.http}://${server.domain}:${server.port}/authentication/change_password`, data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }
};
</script>

<style lang="scss">
.el-message-box {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-message {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.el-notification {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
