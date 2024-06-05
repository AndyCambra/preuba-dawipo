<template>
  <div class="container">
    <h1>Tus empresas seleccionadas</h1>
    <p>Agregá tu número de cliente</p>
    <div v-if="selectedItems.length">
      <div v-for="(item, index) in selectedItems" :key="index">
        <div >
          {{ item }}
          <p>Número de cliente</p>
          <input type="number" v-model="userKey[index]" placeholder="api key">
        </div>
      </div>
      <button @click="proceedToNextPage">Ir al Dashboard</button>        
    </div>
    
    <div v-else>
      <p>No items selected</p>
    </div>
    <BackResponse :data="data" />
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios";
import BackResponse from './Componentes de prueba/BackResponse.vue';

const URL_BACK = "http://localhost:3000";

export default {
  name: 'SelectedItemsPage',
  components: {
    BackResponse,
  },
  data() {
    return {
      selectedItems: this.$route.query.droppedItems || [], 
      userKey: [],
      apiKey: []
    };
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const data = ref([]);
    const error = ref(null);
    const selectedItems = proxy.$route.query.droppedItems || [];

    const fetchData = async () => {
      try {
        const response = await axios.post(URL_BACK, selectedItems);                        
        console.log(response.data);
        data.value = response.data;          
      } catch (err) {
        error.value = err;
      }
    };  

    onMounted(() => {
      fetchData();
    });

    return {
      data,
      error,
    };
  },
  methods: {
    proceedToNextPage() {
      // Aquí puedes acceder al valor del input a través de userKey
      console.log(this.userKey); // Imprime el valor del userKey en la consola
      // Luego puedes hacer cualquier cosa que necesites con ese valor, como pasarla a otra página
      this.$router.push({ 
        name: 'UserDashboard',
        query: { 
          droppedItems: this.droppedItems,
          userKey: this.userKey // Pasar el userKey como parte de la ruta
        }
      });
    },
  }
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
