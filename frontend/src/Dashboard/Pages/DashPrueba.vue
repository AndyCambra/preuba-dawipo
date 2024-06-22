<script setup>
import { ref, computed } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import axios from "axios";
import { useRouter } from "vue-router";

const droppedItems = ref([]); // Array to store dropped items
const loading = ref(false);
const selectedItems = ref([]);
const router = useRouter();

const dataModel = ref([
  { name: "Neumaticos", courier: "DHL" },
  { name: "Remeras", courier: "DHL" },
]);
const columnDefs = [
  {
    field: "Seleccionar",
    maxWidth: 140,
    checkboxSelection: true,
    headerCheckboxSelection: true,
  },
  {
    headerName: "Transportista",
    field: "courier",
    sortable: true,
    filter: true,
  },
  { headerName: "Nombre", field: "name", sortable: true, filter: true },
  {
    headerName: "País de origen",
    field: "originCountry",
    sortable: true,
    filter: true,
  },
  {
    headerName: "País de destino",
    field: "finalCountry",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Fecha de salida",
    field: "departureDate",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Fecha de llegada",
    field: "arrivalDate",
    sortable: true,
    filter: true,
  },
  { headerName: "Estado", field: "status", sortable: true, filter: true },
  { headerName: "Proveedor", field: "provider", sortable: true, filter: true },
];
const defaultColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
};

const groupedItems = computed(() => {
  return dataModel.value.reduce((groups, item) => {
    const group = groups[item.courier] || [];
    group.push(item);
    groups[item.courier] = group;
    return groups;
  }, {});
});

const selectedCount = computed(() => {
  return selectedItems.value.length;
});

const startDrag = (event, item) => {
  event.dataTransfer.setData("text/plain", JSON.stringify(item));
};

const onDrop = (event) => {
  event.preventDefault();
  const item = JSON.parse(event.dataTransfer.getData("text/plain"));
  handleDrop(item);
};

const handleDrop = async (item) => {
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:3001/products/${item.name}`,
    );
    droppedItems.value.push({ ...item, ...response.data });
    droppedItems.value = droppedItems.value.slice();
  } catch (error) {
    console.error("Error al realizar la solicitud HTTP:", error);
  } finally {
    loading.value = false;
  }
};

const itemIsDropped = (item) => {
  return droppedItems.value.some(
    (droppedItem) =>
      droppedItem.name === item.name && droppedItem.courier === item.courier,
  );
};

const removeItems = () => {
  droppedItems.value = droppedItems.value.filter(
    (item) => !selectedItems.value.includes(item),
  );
  selectedItems.value = [];
};

const onSelectionChanged = (event) => {
  selectedItems.value = event.api.getSelectedRows();
};

const rowSelection = ref("multiple");
const gridApi = ref(null);

const onGridReady = (params) => {
  gridApi.value = params.api;
};

const navigateToHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="container">
    <h1>Dashboard</h1>
    <p>Seleccioná y arrastrá los elementos a la zona de soltar.</p>
    <div class="drag-section">
      <div class="drag-inside">
        <div
          class="drag-container"
          v-for="(items, courier) in groupedItems"
          :key="courier"
        >
          <h3>{{ courier }}</h3>
          <div
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'drag-el': true, disabled: itemIsDropped(item) }"
            @dragstart="startDrag($event, item)"
            :draggable="!itemIsDropped(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="drop-area" @dragover.prevent @drop="onDrop">
        <h2>Soltar acá</h2>
        <div v-if="droppedItems.length">
          <button class="btn-danger" @click="removeItems">
            Eliminar Seleccionados ({{ selectedCount }})
          </button>
          <ag-grid-vue
            class="ag-theme-alpine"
            style="width: 100%; height: 400px"
            :columnDefs="columnDefs"
            :rowData="droppedItems"
            :defaultColDef="defaultColDef"
            :rowSelection="rowSelection"
            @grid-ready="onGridReady"
            @selection-changed="onSelectionChanged"
          ></ag-grid-vue>
        </div>
        <div v-else-if="loading" class="loading">
          <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle
              class="pl__ring pl__ring--a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 660"
              stroke-dashoffset="-330"
              stroke-linecap="round"
            ></circle>
            <circle
              class="pl__ring pl__ring--b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 220"
              stroke-dashoffset="-110"
              stroke-linecap="round"
            ></circle>
            <circle
              class="pl__ring pl__ring--c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 440"
              stroke-linecap="round"
            ></circle>
            <circle
              class="pl__ring pl__ring--d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 440"
              stroke-linecap="round"
            ></circle>
          </svg>
        </div>
        <p v-else>No items dropped</p>
      </div>
    </div>
  </div>
  <button @click="navigateToHome">Go to Home</button>
</template>

<style>
.container {
  padding: 20px;
}
.drag-section {
  display: flex;
}
.drag-inside {
  display: flex;
  flex-wrap: wrap;
}
.drag-container {
  margin-right: 20px;
}
.drag-el {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: move;
}
.drag-el.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.drop-area {
  flex-grow: 1;
  padding: 20px;
  border: 2px dashed #ccc;
  background-color: #fafafa;
}
.btn-danger {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
}
.btn-danger:hover {
  background-color: darkred;
}
</style>
