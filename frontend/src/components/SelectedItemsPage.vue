<template>
  <div class="container">
    <h1>Your selected integrations</h1>
    <p>Add your customer number</p>
    <div v-if="selectedItems.length">
      <div class="integration-box" v-for="(item, index) in selectedItems" :key="index">
        <div>
          {{ item }} 
          <br>
          <input type="text" v-model="userKeys[index]" placeholder="api key" />
          <button @click="deleteItem(index)">Delete Item</button>     
          <button @click="deleteData(item)">Delete DB Instance</button>     
          <button @click="fetchAPIData(item)">Get API Response</button>                    
        </div>
      </div>
      <br>
      <button @click="sendData">Send Data </button>
      </div>
      
      <div v-else>
        <p>No items selected</p>
        </div>
        
        <div>
          <button @click="getData">Show Data </button>
          <button @click="navigateToHome">
            Go back Home
           </button>
          <button @click="proceedToNextPage" :disabled="!data">          
            Go to Dashboard      
          </button>              

    </div>    
    <BackResponse v-if="data || error" :data="data" :error="error" />
  </div>
</template>

<script>
import axios from "axios";
import BackResponse from "./Componentes de prueba/BackResponse.vue";

const URL_BACK_INTEGRATIONS = "http://localhost:3001/integrations";

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
      const data = this.selectedItems.map((name, index) => ({
        name,        
        apiKey: this.userKeys[index] || "", 
      }));      

      try { 
        const response = await axios.put(`${URL_BACK_INTEGRATIONS}/update`, data);   
        console.log(response.data);       
        this.data = response.data;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },    
    async getData() {      
      try {              
        const response = await axios.get(URL_BACK_INTEGRATIONS);        
        this.data = response.data;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    },   
    async fetchAPIData(item) {      

      try {        
        const response = await axios.post(`${URL_BACK_INTEGRATIONS}/fetchAPIData`, { name: item });        
        this.data = response.data;
      } catch (err) {
        this.error = err;
        console.error(err);
      }
    }, 
    async deleteData(item) {
      const name = item;
            
      try {
        const response = await axios.delete(`${URL_BACK_INTEGRATIONS}/${name}`);        
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
    navigateToHome() {
      this.$router.push('/');
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

.integration-box {
  padding-bottom: 15px;
}

button, input {  
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
