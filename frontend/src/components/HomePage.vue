<template>
  <div class="container">
    <h1>Choose the services you want to work with</h1>
    <p>Select and drag the items to the drop zone.</p>
    <div><button @click="navigateToSettingServices">Setting Services</button></div>
    <div class="drag-section">
      <div class="drag-container">
        <div
          v-for="(item, index) in availableItems"
          :key="index"
          :class="{ 'drag-el': true, disabled: droppedItems.includes(item) }"
          @dragstart="startDrag($event, item)"
          :draggable="!droppedItems.includes(item)"
        >
          {{ item }}
        </div>
      </div>
      <div class="drop-area" @dragover.prevent @drop="onDrop">
        <h2>Drop here</h2>
        <div v-for="(item, index) in droppedItems" :key="index">
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
    <button @click="proceedToNextPage">Continue</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

const URL_BACK_SERVICES = "http://localhost:3001/services";

export default {
  name: "HomePage",
  setup() {
    const services = ref([]);
    const droppedItems = ref([]);
    const availableItems = ref([]);

    const getData = async () => {      
      try {              
        const response = await axios.get(URL_BACK_SERVICES);        
        const data = await response.data;
        services.value = data.service.map(item => item.name); 
        availableItems.value = data.service.map(item => item.name);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    }

    onMounted(() => {
      getData();
    });

    return {
      services,      
      droppedItems,
      availableItems,
    };
  },
  data() {
    return {      
    };
  },
  methods: {
    startDrag(event, api) {
      // Iniciar el arrastre y pasar el tipo de API
      event.dataTransfer.setData("text/plain", api);
    },
    onDrop(event) {
      event.preventDefault();
      const api = event.dataTransfer.getData("text/plain");
      this.handleDrop(api);
    },
    handleDrop(api) {
      this.droppedItems.push(api); // Add the dropped item to the array
      switch (api) {
        case "Pokemon":
          console.log("https://pokeapi.co/api/v2/generation/");
          break;
        case "Nasa":
          console.log(
            "https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=jq4TlPsf4MsUY09OZgkpYR9naPUTCrMATQdJfsXJ",
          );
          break;
        default:
          console.log("URL predeterminada");
      }
    },
    isDisabled(item) {
      return this.droppedItems.includes(item); // Verificar si el elemento está en droppedItems
    },
    proceedToNextPage() {
      this.$router.push({
        name: "SelectedItemsPage",
        query: { droppedItems: this.droppedItems },
      });
    },
    navigateToSettingServices() {
      this.$router.push('/setting-services');
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 20px;
}
.drag-section {
  display: flex;
}

.drag-container {
  display: flex;
  flex-direction: column;
  width: 25%;
  justify-content: center;
}

.drag-el {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: move;
  background-color: #f0f0f0;
  width: 200px;
  text-align: center;
}

.drop-area {
  margin-top: 20px;
  padding: 20px;
  border: 2px dashed #ccc;
  width: 500px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.drop-area p {
  margin: 0;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 25%;
  width: 550px;
}
</style>
