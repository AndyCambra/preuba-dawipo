<script setup>
import { useRouter } from "vue-router";

const route = useRouter();

const navigateToDashboard = () => {
  route.push("/dash-prueba");
};
</script>

<template>
  <div>
    <h2>La conexíon ha sido exitosa</h2>
    <div class="btns-check-create">
      <button class="btn-check-fields">Check fields</button>
      <button class="btn-navigate-to-dashboard" @click="navigateToDashboard">
        Dashboard
      </button>
    </div>
  </div>
</template>

<style scoped>
.btns-check-create {
  display: flex;
  gap: 1rem;
}
.btn-check-fields,
.btn-navigate-to-dashboard {
  padding: 8px 16px;
  width: 12rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 250ms;
}

.btn-check-fields {
  background-color: transparent;
  border: 2px solid rgb(167, 164, 164);
  color: rgb(167, 164, 164);
}
.btn-check-fields:hover {
  background-color: transparent;
  border: 2px solid black;
  color: black;
}
.btn-navigate-to-dashboard {
  background-color: rgb(0, 255, 206);
  border: 1px solid rgb(0, 255, 206);
  color: black;
}
.btn-navigate-to-dashboard:hover {
  background-color: transparent;
  border: 1px solid rgb(0, 255, 206);
}
</style>
