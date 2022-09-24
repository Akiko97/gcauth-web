<template>
  <el-container>
    <el-header class="nav">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="router-links">
            <div>
              <el-link :underline="false"><router-link to="/">Authentication</router-link></el-link>
              <el-link :underline="false"><router-link to="/about">About</router-link></el-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="preferences">
            <el-switch
              v-model="isDark"
              style="--el-switch-on-color: #363e39; --el-switch-off-color: #363e39"
              inline-prompt
              :active-icon="Moon"
              :inactive-icon="Sunny"
            />
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.nav {
  a {
    font-weight: bold;
    color: #61778e;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.router-links {
  height: 100%;
  display:flex;
	justify-content:center;
	align-items:center;
}
.preferences {
  height: 100%;
}
.router-links .el-link {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
