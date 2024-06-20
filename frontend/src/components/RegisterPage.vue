<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { setUser } from '../utils/auth';

const name = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
  try {
    const response = await axios.post("http://localhost:3001/users/register", {
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    console.log(response.data);
    window.alert(`Registration successful: ${response.data.message}`);
    
    setUser(response.data.user);
    
    router.push("/");
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data.errors) {
      const errors = error.response.data.errors;
      errors.forEach(err => {
        window.alert(`Error in ${err.path}: ${err.msg}`);
      });
    } else {
      window.alert('Error: An unexpected error occurred');
    }
  }
};
</script>

<template>
  <div class="container">
    <h1>User Registration</h1>
    <form @submit.prevent="register" class="form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="lastName" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" class="btn">Register</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #218838;
}
</style>