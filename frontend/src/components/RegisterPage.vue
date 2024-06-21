<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { setUser } from '../utils/auth';
import Logo from '../../public/Logo de Kontroll.png'

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

const navigateToLogin = () =>{
  router.push("/login");
}

</script>

<template>
  <div class="container">
    <img class="img-register" :src="Logo" alt="Logo de Kontroll">
    <div class="page-container">
      <div class="form-container">
        <div class="form-title">
          <h1>Register</h1>
          <p>Enter your email to sign up for this app</p>
      </div>
      <form @submit.prevent="register">
          <input type="text" v-model="name" placeholder="Name" required />
          <input type="text" v-model="lastName" placeholder="Last Name" required />
          <input type="email" v-model="email"  placeholder="Email" required/>
          <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit" class="btn-register">Register</button>
      </form>
      <button @click="navigateToLogin" class="btn-login">Login</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: black;
  min-height: 95.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.img-register{
  position: absolute;
  top: 0; 
  left: 0;
}
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: #fff;
}
h1 {
  text-align: center;
  font-weight: 600;
}
.form-title {
  color: #00FFCE;
  text-align: center;
}
.form-container {
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.2rem 2rem;
  border: 2px solid transparent;
  border-radius: 20px;
  box-sizing: border-box;
  background-image: linear-gradient(black, black), linear-gradient(to right, #00FFCE, transparent);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
input {
  width: 100%;
  padding: 0.7rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: gray;
  background-color: #fff;
  margin-bottom: 1.3rem;
  font-size: 1.1rem;
}
.btn-register {
  background-color: rgb(0, 255, 206);
  border: 1px solid rgb(0, 255, 206);
  width: 100%;
  color: black;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  transition: all 250ms;
}
.btn-register:hover {
  background-color: transparent;
  border: 1px solid rgb(0, 255, 206);
  color: white;
}
.btn-login {
  margin-top: 1rem;
  align-self: flex-end;
  background-color: transparent;
  color: gray;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  transition: all 250ms;
}
.btn-login:hover {
  color: #00FFCE;
}
</style>
