<script setup>
import { ref } from "vue";
import CheckCreateConnector from "./CheckCreateConnector.vue";

const formData = ref({
  name: "",
  url: "",
  username: "",
  apiKey: "",
});

const isSuccess = ref(false);

const handleResetForm = () => {
  formData.value = {
    name: "",
    url: "",
    username: "",
    apiKey: "",
  };
  isSuccess.value = false;
};

const handleSubmit = () => {
  if (
    formData.value.name &&
    formData.value.url &&
    formData.value.username &&
    formData.value.apiKey
  ) {
    isSuccess.value = true;
  } else {
    alert("Por favor complete todos los campos");
    isSuccess.value = false;
  }
  console.log(formData.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="container-form">
    <input type="text" placeholder="Conection Name" v-model="formData.name" />
    <input type="text" placeholder="Url" v-model="formData.url" />
    <input type="text" placeholder="User Name" v-model="formData.username" />
    <input type="text" placeholder="ApiKey / Token" v-model="formData.apiKey" />
    <div class="btn-form-connector">
      <button class="btn-cancel" type="button" @click="handleResetForm">
        Cancelar
      </button>
      <button class="btn-create-connector" type="submit">Crear</button>
    </div>
  </form>
  <CheckCreateConnector v-if="isSuccess" />
</template>

<style scoped>
.container-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid rgb(0, 255, 206);
  padding: 1.5rem;
  border-radius: 25px;
  width: 30rem;
}
input {
  border-radius: 10px;
  padding: 0.6rem;
  outline: none;
  border: 1px solid rgb(167, 164, 164);
  font-size: 1.1rem;
}
.btn-form-connector {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.btn-cancel,
.btn-create-connector {
  padding: 8px 16px;
  width: 12rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 250ms;
}
.btn-cancel {
  background-color: transparent;
  border: 2px solid rgb(167, 164, 164);
  color: rgb(167, 164, 164);
}
.btn-cancel:hover {
  background-color: transparent;
  border: 2px solid black;
  color: black;
}
.btn-create-connector {
  background-color: rgb(0, 255, 206);
  border: 1px solid rgb(0, 255, 206);
  color: black;
}
.btn-create-connector:hover {
  background-color: transparent;
  border: 1px solid rgb(0, 255, 206);
}
</style>
