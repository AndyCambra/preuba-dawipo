<script setup>
import { user, isAuthenticated } from "./utils/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import NavBar from './components/NavBar.vue';

const router = useRouter();

const checkAuth = () => {
  if (!user.value) {
    router.push("/login");
  }
};

onMounted(() => {
  checkAuth();
});
</script>

<template>
  <div id="app">
    <NavBar v-if="isAuthenticated" />
    <router-view></router-view>
  </div>
</template>

<style scoped>
/* Estilos globales */
</style>


