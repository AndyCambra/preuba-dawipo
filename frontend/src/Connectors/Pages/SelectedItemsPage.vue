<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import BackResponse from "../../Connectors/Components/BackResponse.vue";

const URL_BACK_CONNECTORS = "http://localhost:3001/connectors";

const route = useRoute();
const router = useRouter();

const selectedItems = ref([]);
try {
  selectedItems.value = JSON.parse(route.query.droppedItems) || [];
} catch (e) {
  console.error("Error parsing droppedItems:", e);
}

const userKeys = ref([]);
const data = ref(null);
const error = ref(null);

const sendData = async () => {
  const payload = selectedItems.value.map((name, index) => ({
    name,
    apiKey: userKeys.value[index] || "",
  }));

  try {
    const response = await axios.put(`${URL_BACK_CONNECTORS}/update`, payload);
    console.log(response.data);
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

const deleteData = async (item) => {
  try {
    const response = await axios.delete(`${URL_BACK_CONNECTORS}/${item}`);
    data.value = response.data;
  } catch (err) {
    error.value = err;
    console.error(err);
  }
};

const deleteItem = (index) => {
  selectedItems.value.splice(index, 1);
};

const proceedToNextPage = () => {
  if (data.value) {
    router.push({
      name: "DashTest",
      query: {
        droppedItems: JSON.stringify(selectedItems.value),
        userKeys: JSON.stringify(userKeys.value),
      },
    });
  }
};

const navigateToHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="container">
    <h1>Your selected connectors</h1>
    <p>Add your customer number</p>
    <div v-if="selectedItems.length">
      <div
        class="integration-box"
        v-for="(item, index) in selectedItems"
        :key="index"
      >
        <div>
          {{ item }}
          <br />
          <input type="text" v-model="userKeys[index]" placeholder="api key" />
          <button @click="deleteItem(index)">Delete Item</button>
          <button @click="deleteData(item)">Delete DB Instance</button>
        </div>
      </div>
      <br />
      <button @click="sendData">Send Data</button>
    </div>

    <div v-else>
      <p>No items selected</p>
    </div>

    <div>
      <button @click="getData">Show Data</button>
      <button @click="navigateToHome">Go back Home</button>
      <button @click="proceedToNextPage" :disabled="!data">
        Go to Dashboard
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

button,
input {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
