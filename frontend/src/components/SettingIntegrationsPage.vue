<template>
  <div class="container">
    <h1>Add your Integration</h1>    
    <div>
      <input type="text" v-model="name" placeholder="Name" />
      <input type="text" v-model="apiUrl" placeholder="API url" />
          
      <br>
      </div>     
      <div>
      <button @click="sendData">Send Data </button>            
      <button @click="getData">Show Data </button>
      <button @click="navigateToHome">
        Go back Home
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
  name: "SettingIntegrationsPage",
  components: {
    BackResponse,
  },
  data() {
    return {   
      name: "",
      apiUrl: "",      
      data: null,
      error: null,
    };
  },
  methods: {
    async sendData() {      
      const data = { name: this.name, apiUrl: this.apiUrl };       
      try {        
        const response = await axios.post(`${URL_BACK_INTEGRATIONS}`, data);        
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
      const name = item.name;
            
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