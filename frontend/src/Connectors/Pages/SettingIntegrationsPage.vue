<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BackResponse from '../../Connectors/Components/BackResponse.vue';

const URL_BACK_CONNECTORS = 'http://localhost:3001/connectors';

const name = ref('');
const apiUrl = ref('');
const data = ref(null);
const error = ref(null);
const router = useRouter();

const sendData = async () => {
  const payload = { name: name.value, apiUrl: apiUrl.value };
  try {
    const response = await axios.post(URL_BACK_CONNECTORS, payload);
    data.value = response.data;
  } catch (err) {
    error.value = err;
    console.error(err);
  }
};

const getData = async () => {
  try {
    const response = await axios.get(URL_BACK_CONNECTORS);
    data.value = response.data;
  } catch (err) {
    error.value = err;
    console.error(err);
  }
};

/*
const deleteData = async (item) => {
  try {
    const response = await axios.delete(`${URL_BACK_CONNECTORS}/${item.name}`);
    data.value = response.data;
  } catch (err) {
    error.value = err;
    console.error(err);
  }
}; */

/* const deleteItem = (index) => {
  selectedItems.value.splice(index, 1);
};
 */

const navigateToHome = () => {
  router.push('/');
};
</script>
<template>
  <div class="container">
    <h1>Add your Connector</h1>    
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