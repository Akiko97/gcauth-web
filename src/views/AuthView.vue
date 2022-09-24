<template>
  <div class="home">
    <img alt="Nahida" src="../assets/nahida.png" style="width: 30%">
    <h1>Welcome to Authentication System</h1>
    <Authentication/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Authentication from '@/components/Authentication.vue';
export default defineComponent({
  name: 'HomeView',
  components: {
    Authentication,
  }
});
</script>
