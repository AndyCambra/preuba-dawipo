<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const URL_BACK_CONNECTORS = "http://localhost:3001/connectors";

const connectors = ref([]);
const droppedItems = ref([]);
const availableItems = ref([]);
const router = useRouter();

const getData = async () => {
  try {
    const response = await axios.get(URL_BACK_CONNECTORS);
    const data = await response.data;
    connectors.value = data.connectors.map((item) => item.name);
    availableItems.value = data.connectors.map((item) => item.name);
  } catch (err) {
    console.error(err);
  }
};

const startDrag = (event, api) => {
  event.dataTransfer.setData("text/plain", api);
};

const onDrop = (event) => {
  event.preventDefault();
  const api = event.dataTransfer.getData("text/plain");
  handleDrop(api);
};

const handleDrop = (api) => {
  droppedItems.value.push(api);
};

const proceedToNextPage = () => {
  if (droppedItems.value.length > 0) {
    router.push({
      name: "SelectedItemsPage",
      query: { droppedItems: JSON.stringify(droppedItems.value) },
    });
  } else {
    console.warn("No items dropped");
  }
};

const navigateToSettingconnectors = () => {
  router.push("/setting-connectors");
};

const navigateToDashPrueba = () => {
router.push('/dashboard-a');
};

const navigateToDashTest = () => {
  router.push("/dash-test");
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="container">
    <h1>Choose the connectors you want to work with</h1>
    <p>Select and drag the items to the drop zone.</p>
    <div>
      <button @click="navigateToDashPrueba">Go to "dash-prueba"</button>
    </div>
    <div><button @click="navigateToDashTest">Go to "dash-test"</button></div>
    <div>
      <button @click="navigateToSettingconnectors">Setting connectors</button>
    </div>
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
