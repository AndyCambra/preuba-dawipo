<script setup>
import { ref, computed } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { user } from '../../utils/auth'
import DHL from '../../../public/DHL.png'
import Maersk from '../../../public/Maersk.png'
import MSC from '../../../public/MSC.png'


const droppedItems = ref([]); // Array to store dropped items
const loading = ref(false);
const selectedItems = ref([]);
const router = useRouter();

const dataModel = ref([
  { img: DHL, courier: "DHL Global Fowarding" },
  { img: Maersk, courier: "Maersk" },
  { img: MSC , courier: "Mediterranean Shipping Company" },
]);
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
    const response = await axios.get(`http://localhost:3001/products/${item.name}`);
    droppedItems.value.push({ ...item, ...response.data });
    droppedItems.value = droppedItems.value.slice();
  } catch (error) {
    console.error('Error al realizar la solicitud HTTP:', error);
  } finally {
    loading.value = false;
  }
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

const rowSelection = ref('multiple');
const gridApi = ref(null);

const onGridReady = (params) => {
  gridApi.value = params.api;
};

const navigateToHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="container">
    <div class="container-title">
      <h1>Bienvenido {{ user.name }}</h1>
      <p>Gestionemos tus conectores.</p>
    </div>
    <div class="drag-section">
      <div>
        <h2>Mis Conexiones</h2>
      <div class="drag-inside">
        <div class="drag-container" v-for="(items, courier) in groupedItems" :key="courier">
          <div
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'drag-el': true, disabled: itemIsDropped(item) }"
            @dragstart="startDrag($event, item)"
            :draggable="!itemIsDropped(item)"
          >
          <div class="drag-connectors">
            <img :src="item.img" alt="">
            <h3>{{ courier }}</h3>
            {{ item.name }}
          </div>
          </div>
        </div>
      </div>
      </div>
      <div>
        <h2>Mis Conexiones</h2>
      <div class="drag-inside">
        <div class="drag-container" v-for="(items, courier) in groupedItems" :key="courier">
          <div
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'drag-el': true, disabled: itemIsDropped(item) }"
            @dragstart="startDrag($event, item)"
            :draggable="!itemIsDropped(item)"
          >
          <div class="">
            <img src="" alt="">
            <h3>{{ courier }}</h3>
            {{ item.name }}
          </div>
          </div>
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
        <div v-else-if="loading" class="loading">
          <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle class="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
            <circle class="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
            <circle class="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
            <circle class="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
          </svg>
        </div>
        <p v-else>No items dropped</p>
      </div>
    </div>
  </div>
  <button @click="navigateToHome">
      Go to Home
  </button>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
h1{
  margin: 0;
  font-weight: 600;
}
.container-title{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container-title p{
  font-size: 1.3rem;
}
.drag-section {
  display: flex;
  gap: 3rem;
}
.drag-inside {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1rem;
  border: 2px solid rgb(0,255,206);
  border-radius: 25px;
  min-height: 25rem;
}
.drag-inside h2 {
  font-weight: 600;
}
.drag-connectors{
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 18rem;
}
.drag-connectors h3{
  display: flex;
  align-items: center;
  gap: 2rem;
  font-weight: 500;
  font-size: 1rem;
}
.drag-connectors img{
  width: 3rem;
}
.drag-el {
  margin-bottom: 10px;
  cursor: move;
  background-color: white;
  border-radius: 50px;
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
