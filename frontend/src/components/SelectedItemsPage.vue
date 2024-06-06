<template>
  <div class="container">
    <h1>Tus empresas seleccionadas</h1>
    <p>Agregá tu número de cliente</p>
    <div v-if="selectedItems.length">
      <div v-for="(item, index) in selectedItems" :key="index">
        <div>
          {{ item }} <button @click="deleteData(index)">Borrar</button>
          <p>Número de cliente</p>
          <input type="text" v-model="userKeys[index]" placeholder="api key" />
        </div>
      </div>
      <button @click="sendData">Enviar Datos</button>
      <button @click="proceedToNextPage" :disabled="!data">
        Ir al Dashboard
      </button>
    </div>
    <div v-else>
      <p>No items selected</p>
    </div>

    <!-- Mostrar BackResponse si hay data -->
    <BackResponse v-if="data" :data="data" />
  </div>
</template>

<script>
import axios from "axios";
import BackResponse from "./Componentes de prueba/BackResponse.vue";

const URL_BACK_SERVICES = "http://localhost:3001/services";

export default {
  name: "SelectedItemsPage",
  components: {
    BackResponse,
  },
  data() {
    return {
      selectedItems: this.$route.query.droppedItems || [],
      userKeys: [],
      data: null,
      error: null,
    };
  },
  methods: {
    async sendData() {
      console.log(this.userKeys); // Imprime el valor de userKeys en la consola

      // Crear el payload combinando selectedItems y userKeys
      const combinedData = this.selectedItems.map((item, index) => ({
        item,
        userKey: this.userKeys[index] || "", // Usa una cadena vacía si no hay userKey
      }));
      try {
        // Realizar la solicitud POST
        const response = await axios.post(URL_BACK_SERVICES, combinedData);
        console.log(response.data);
        this.data = response.data;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    async deleteData(index) {
      try {
        //Eliminar elemento del array selectedItems
        this.selectedItems.splice(index, 1);

        //Realizar la solicitud DELETE
        const response = await axios.delete(`${URL_BACK_SERVICES}/delete/${index}`);
        console.log(response.data);
        this.data = response.data;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },
    proceedToNextPage() {
      // Navegar a la siguiente página solo si se han enviado los datos correctamente
      if (this.data) {
        this.$router.push({
          name: "UserDashboard",
          query: {
            droppedItems: this.selectedItems,
            userKeys: this.userKeys, // Pasar userKeys como parte de la ruta
          },
        });
      }
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;
  width: 200px;
}
</style>
