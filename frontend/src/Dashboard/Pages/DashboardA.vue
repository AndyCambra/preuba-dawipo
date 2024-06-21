<script setup>
import { ref, computed } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import axios from 'axios';
import { useRouter } from 'vue-router';
import StadisticSection from '../Components/StadisticSection.vue'
import { ArrowIcon, PlusIcon, Close } from '../Components/icons';
import LogoDhl from '../../../public/dhllogo.png'
import LogoMaersk from '../../../public/MaerskLogo.png'
import LogoMsc from '../../../public/msclogo.png'


const droppedItems = ref([]); // Array to store dropped items
const loading = ref(false);
const isBoxOpen = ref(false);
const selectedItems = ref([]);
const router = useRouter();

const dataModel = ref([
  { name: "Neumaticos", courier: "DHL" },
  { name: "Remeras", courier: "DHL" }
]);

const connectors= ref([
  {name: 'DHL Global Fowarding', logo: LogoDhl},
  {name: 'Maersk', logo: LogoMaersk},
  {name: 'Mediterranean Shipping Company', logo: LogoMsc},
])
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
const boxClass = computed(() => {
      return isBoxOpen.value ? 'connectors-selected-box' : 'connectors-selected-box-shrink';
    });
const boxClassInverted = computed(() => {
      return isBoxOpen.value ?  'connectors-selected-box-shrink' : 'connectors-selected-box' ;
    });

const toggleBoxSize = () => {
      isBoxOpen.value = !isBoxOpen.value;
    };
</script>

<template>
  <div class="container">
    <StadisticSection />
   <div class="data-container">
      <div class="side-section-container">
        <div :class="boxClass">
          <div class="icon-box">
          <div class="icon" v-html="ArrowIcon" @click="toggleBoxSize"></div>
          <div class="icon-grey" v-html="PlusIcon"  @click="navigateToHome"></div>
          </div>
          <div class="connectors-list" v-for="(item, index) in connectors" :key="index">
            <div class="connector-item">
              <img :src= "item.logo" :alt="item.name" class="connector-logo">
              <p class="connector-name">{{ item.name }}</p>
              <div class="icon-grey-small" v-html="Close"></div>
            </div>
          </div>
        </div>




        <div :class="boxClassInverted">
        <div class="drag-container" v-for="(items, courier) in groupedItems" :key="courier">
          <h4 class="courrier-name">{{ courier }}</h4>
          <div
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'drag-el': true, disabled: itemIsDropped(item) }"
            @dragstart="startDrag($event, item)"
            :draggable="!itemIsDropped(item)"
          >
          <p class="drag-index">{{ index }}</p>
          <p class="drag-item">{{ item.name }}</p> 
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


<style>
.container {
  padding: 20px;
}
.data-container{
 
  display: flex;
  min-height: 60vh;
  gap: 8px;
}
.side-section-container{
  width: 265px;
  display: flex;
  gap: 8px;
  
}
.connectors-selected-box{
  width: 197px;
  padding: 8px;
  border: 2px solid transparent;
  border-radius: 20px;
  box-sizing: border-box;
  background-image: linear-gradient(#fff, #fff), linear-gradient(to right, #00FFCE, transparent);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  
}
.connectors-selected-box-shrink{
  width: 60px;
  padding: 8px;
  border: 2px solid transparent;
  border-radius: 20px;
  box-sizing: border-box;
  background-image: linear-gradient(#fff, #fff), linear-gradient(to right, #00FFCE, transparent);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.icon-box{
  display: flex;
  justify-content: space-between;
  
}
.icon{
  width: 40px;
  height: 40px;
  border: 2px solid #00FFCE;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;

}
.connectors-selected-box .icon{
  transform: rotate(180deg);
}
.icon-grey{
  width: 40px;
  height: 40px;
  border: 2px solid #9b9d9d;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;

}
.icon-grey-small{
  color: #9b9d9d ;
}
.connectors-selected-box-shrink .icon-grey {
  display: none;
}
.connectors-selected-box-shrink .icon-grey-small {
  display: none;
}
.connector-list{
  padding: 12px 0;
}
.connector-item{
  display: flex;
  font-size: 12px;
  padding: 12px 0;
  gap: 8px;
  align-items: center ;
  justify-content: space-between;
  height: 40px;
}
.connector-name {
  display: block; 
  flex-grow: 2;
  font-weight: 500;
}
.connectors-selected-box-shrink .connector-name {
  display: none;
}
.connector-logo{
  width: 40px;
  height: 40px;
}



.drag-section {
  display: flex;
}
.drag-inside {
  display: flex;
  flex-wrap: wrap;
}
.drag-container {
  padding: 0;
  margin: 0;
}
.courrier-name{
  margin: 8px 0;
}
.drag-el {
  padding: 0 8px;
  margin-bottom: 8px;
  background-color:  rgba(0, 255, 206, 0.20);;
  cursor: move;
  border-radius: 8px;
  display: flex;
  gap: 12px;
}
.drag-index{
  margin: 8px 4px;
  font-weight: 700;
}
.drag-item{
  margin: 8px 0;
  font-weight: 500;
}
.connectors-selected-box-shrink .drag-item{
  display: none;
}
.connectors-selected-box-shrink .drag-el{
  margin: 8px auto;
  text-align: center;
}
.connectors-selected-box-shrink .drag-index{
  margin: 8px auto;
  text-align: center;
}

.drag-el.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.drop-area {
  flex-grow: 1;
  padding: 20px;
  border: 2px solid transparent;
  border-radius: 20px;
  box-sizing: border-box;
  background-image: linear-gradient(#fff, #fff), linear-gradient(to right, #00FFCE, transparent);
  background-origin: border-box;
  background-clip: padding-box, border-box;
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
