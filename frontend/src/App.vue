<script setup>
import { user, isAuthenticated, logout } from './utils/auth';
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Logo from '../public/Logo de Kontroll.png'

const router = useRouter();
const route = useRoute();

onMounted(() => {
  checkAuth();
});

const checkAuth = () => {
  if (!user.value) {
    router.push('/login');
  }
};

const handleLogout = () => {
  logout();
  router.push('/login');
};
const handleDashboard = () => {
  router.push('/dash-prueba');
};
const handleHome = () => {
  router.push('/');
};

// Computed property to check if the current route is /dash-prueba
const isDashPruebaRoute = computed(() => route.path === '/dash-prueba');
</script>

<template>
  <div id="app">
    <header v-if="isAuthenticated">
      <nav>
        <img 
          :src="Logo" 
          alt="Kontroll"
          @click="handleHome"
        >
        <div class="btns-header">
          <button 
            v-if="!isDashPruebaRoute" 
            class="btn-dashboard" 
            @click="handleDashboard">
            Dashboard
          </button>
          <button class="btn-logout" @click="handleLogout">Logout</button>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<style scoped>

header {
  background-color: black;
  color: white;
  font-family: "Montserrat", sans-serif;
  padding: 1.5rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav span {
  font-weight: bold;
}

.btn-dashboard {
  background-color: rgb(0,255,206);
  border: 1px solid rgb(0,255,206);
  color: black;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 250ms;
}

.btn-dashboard:hover {
  background-color: transparent;
  border: 1px solid rgb(0,255,206);
  color: white;
}
.btn-logout{
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 250ms;
}
.btn-logout:hover{
  color: rgb(0,255,206);
}
.btns-header{
  display: flex;
  align-items: center;
  gap: 1rem;
}
img{
  cursor: pointer;
}
</style>
