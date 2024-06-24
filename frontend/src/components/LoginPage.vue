<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { setUser } from '../utils/auth';
import Logo from '../../public/Logo de Kontroll.png'

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post("http://localhost:3001/users/login", {
      email: email.value,
      password: password.value,
    });
    console.log(response.data);
    window.alert(`Login successful: ${response.data.message}`);

    setUser(response.data.user);

    router.push("/dash-test");
  } catch (error) {
    console.error(error);
    if (error.response) {
      if (error.response.data.errors) {
        const errors = error.response.data.errors;
        errors.forEach((err) => {
          window.alert(`Error in ${err.path}: ${err.msg}`);
        });
      } else if (error.response.data.error) {
        window.alert(`Error: ${error.response.data.message}`);
      }
    } else {
      window.alert("Error: An unexpected error occurred");
    }
  }
};
</script>

<template>
  <div class="background">
    <img 
          :src="Logo" 
          alt="Kontroll">
  <div class="container">
    <h1>User Login</h1>
    <form @submit.prevent="login" class="form">
      <p class="subtitle">Complete el formulario para ingresar a la app</p>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required placeholder="Email"/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required placeholder="Contraseña"/>
      </div>
      <button type="submit" class="btn">Login</button>
      <p class="bottom-line">Don't have an account? <router-link to="/register" class="link">Register</router-link></p>
    </form>
  </div>
</div>
</template>

<style scoped>
.background{
  background-color: #05050C ;
  margin: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  padding: 1.5rem;
  box-sizing: border-box;
}
.container {
  max-width: 400px;
  margin: 120px auto;
  padding: 32px;
  border: 2px solid transparent;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #05050C ;
  background-image: linear-gradient(#05050C , #05050C ), linear-gradient(to right, #00FFCE, transparent);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

h1 {
  text-align: center;
  margin-bottom: 0;
  color: #00FFCE;
  font-weight: 500;
}
.subtitle{
  color: #00FFCE;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
}



/* label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #00FFCE;
} */

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 8px;
}
:placeholder-shown{
  color: #828282;
}
.btn {
  padding: 10px 15px;
  border: 1px solid #00FFCE;
  border-radius: 8px;
  background-color: #05050C;
  color: #00FFCE;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 16px;
}

.btn:hover {
  background-color: #00FFCE;
  color: #05050C;
}
.bottom-line{
  color: #828282;
  text-align: right;
}
.link{
  color: #00FFCE;
  text-decoration: none;
}
</style>
