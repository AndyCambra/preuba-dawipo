<script setup>
import { user, isAuthenticated, logout } from './utils/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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

</script>

<template>
  <div id="app">
    <header v-if="isAuthenticated">
      <nav>
        <span>Welcome, {{ user.name }}</span>
        <button @click="handleLogout">Logout</button>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<style>
header {
  background-color: #333;
  color: white;
  padding: 10px 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav span {
  font-weight: bold;
}

nav button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

nav button:hover {
  background-color: #c82333;
}
</style>


