<script setup>
  import CreateConnectorForm from '../Components/CreateConnectorForm.vue'; 
  import { user } from '../../utils/auth.js'
</script>

<template>
  <main class="container-create-connector">
    <div class="create-connector-title">
      <h1>Bienvenido {{ user.name }}</h1>
      <p>Crea una conexión personalizada</p>
    </div>
    <CreateConnectorForm />
  </main>
</template>

<style scoped>
h1{
  margin-bottom: 0rem
}
.container-create-connector{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.create-connector-title{
  text-align: center;
}
</style>