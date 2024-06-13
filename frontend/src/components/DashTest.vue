<script setup>
import { ref, onMounted, watch, reactive, computed } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import axios from "axios";

const URL_BACK_PRODUCTS = "http://localhost:3001/products";

const columnDefs = [
  { field: "Seleccionar", maxWidth: 140, checkboxSelection: true, headerCheckboxSelection: true },
  { headerName: "Transportista", field: "courier", sortable: true, filter: true },
  { headerName: "Nombre", field: "name", sortable: true, filter: true },
  { headerName: "País de origen", field: "originCountry", sortable: true, filter: true },
  { headerName: "País de destino", field: "finalCountry", sortable: true, filter: true },
  { headerName: "Fecha de salida", field: "departureDate", sortable: true, filter: true },
  { headerName: "Fecha de llegada", field: "arrivalDate", sortable: true, filter: true },
  { headerName: "Estado", field: "status", sortable: true, filter: true },
  { headerName: "Proveedor", field: "provider", sortable: true, filter: true },
];

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true
};

const rowSelection = ref('multiple');

const dataModel = ref([]);
const droppedItems = ref([]);
const selectedItems = ref([]);
const groupedItems = reactive({});

const getData = async () => {
  try {
    const response = await axios.get(URL_BACK_PRODUCTS);
    const data = response.data;            
    dataModel.value = data.products; 
    droppedItems.value = data.products;
    console.log(data);            
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  getData().then(() => {            
    Object.assign(groupedItems, dataModel.value.reduce((groups, item) => {
      if (!item) return groups;
      const group = groups[item.courier] || [];
      group.push(item);
      groups[item.courier] = group;
      return groups;
    }, {}));
  });
});

const startDrag = (event, item) => {
  event.dataTransfer.setData("text/plain", JSON.stringify(item));
};

const onDrop = (event) => {
  event.preventDefault();
  const item = JSON.parse(event.dataTransfer.getData("text/plain"));
  handleDrop(item);
};

const handleDrop = (item) => {
  droppedItems.value.push({ ...item });
  droppedItems.value = droppedItems.value.slice();
};

const itemIsDropped = (item) => {
  return droppedItems.value.some(droppedItem => droppedItem.name === item.name && droppedItem.courier === item.courier);          
};

const removeItems = () => {
  droppedItems.value = droppedItems.value.filter(item => !selectedItems.value.includes(item));
  selectedItems.value = []; 
};

const onSelectionChanged = (event) => {
  selectedItems.value = event.api.getSelectedRows();
};

const selectedCount = computed(() => {
  return selectedItems.value.length;
});

watch(dataModel, (newValue) => {
  Object.assign(groupedItems, newValue.reduce((groups, item) => {
    if (!item) return groups; 
    const group = groups[item.courier] || [];
    group.push(item);
    groups[item.courier] = group;
    return groups;
  }, {}));
});

</script>

<template>
  <div class="container">
    <h1>Dashboard</h1>
    <p>Seleccioná y arrastrá los elementos a la zona de soltar.</p>
    <div class="drag-section">
      <div class="drag-inside">      
        <div class="drag-container" v-for="(items, courier) in groupedItems" :key="courier">
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
          <button class="btn-danger" @click="removeItems">Eliminar Seleccionados ({{ selectedCount }})</button>
          <ag-grid-vue
            class="ag-theme-alpine"
            style="width: 100%; height: 400px;"
            :columnDefs="columnDefs"
            :rowData="droppedItems"
            :defaultColDef="defaultColDef"
            :rowSelection="rowSelection"
            @grid-ready="onGridReady"
            @selection-changed="onSelectionChanged"
          ></ag-grid-vue>
        </div>        
        <p v-else>No items dropped</p>
      </div>
    </div>
    <button @click="navigateToHome">
      Go back Home
    </button>
  </div>
</template>



<style>
/* Puedes añadir estilos personalizados aquí */
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
