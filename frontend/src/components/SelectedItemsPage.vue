<template>
  <div class="container">
    <h1>Your selected services</h1>
    <p>Add your customer number</p>
    <div v-if="selectedItems.length">
      <div v-for="(item, index) in selectedItems" :key="index">
        <div>
          {{ item }} <button @click="deleteItem(index)">Delete Item</button>
          <button @click="deleteData(item)">Delete DB Instance</button>
          <button @click="fetchAPIData(item)">Get API Response</button>
          <p>Client number</p>
          <input type="text" v-model="apiUrls[index]" placeholder="api url" /><br><br>
          <input type="text" v-model="userKeys[index]" placeholder="api key" />
        </div>
      </div>
      <br>
      <button @click="sendData">Send Data </button>
      <button @click="getData">Show Data </button>
      <button @click="proceedToNextPage" :disabled="!data">
        Go to Dashboard
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
      apiUrls: [],
      userKeys: [],
      data: null,
      error: null,
    };
  },
  methods: {
    async sendData() {
      const combinedData = this.selectedItems.map((name, index) => ({
        name,
        apiUrl: this.apiUrls[index] || "",
        apiKey: this.userKeys[index] || "", 
      }));

      try {        
        const response = await axios.post(URL_BACK_SERVICES, combinedData);        
        this.data = response.data;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },    
    async getData() {      
      try {              
        const response = await axios.get(URL_BACK_SERVICES);        
        this.data = response.data;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },   
    async fetchAPIData(item) {      

      try {        
        const response = await axios.post(`${URL_BACK_SERVICES}/fetchData`, { name: item });        
        this.data = response.data;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    }, 
    async deleteData(item) {
      const name = item;
            
      try {
        const response = await axios.delete(`${URL_BACK_SERVICES}/${name}`);        
        this.data = response.data;
      } catch (err) {
        this.error = err;
        
      }
    },
    async deleteItem(index) {      
        this.selectedItems.splice(index, 1);      
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

button {  
  margin-right: 5px;
}
</style>
