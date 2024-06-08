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
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';

export default defineComponent({
  name: 'DashPrueba',
  components: {
    AgGridVue,
  },
  data() {
    return {
      droppedItems: [], // Array to store dropped items
      dataModel: [
        {
          name: "Neumaticos",
          originCountry: "Argentina",
          finalCountry: "Mexico",
          departureDate: "20/9/24",
          arrivalDate: "24/11/24",
          status: "Processing",
          provider: "Esxxxe",
          courier: "DHL"
        },
        {
          name: "Remeras",
          originCountry: "USA",
          finalCountry: "Chile",
          departureDate: "2/8/24",
          arrivalDate: "11/10/24",
          status: "Processing",
          provider: "Nike",
          courier: "DHL"
        },
        {
          name: "Computadoras",
          originCountry: "Italia",
          finalCountry: "Francia",
          departureDate: "2/6/24",
          arrivalDate: "11/10/24",
          status: "Travelling",
          provider: "Adidas",
          courier: "UPS"
        },
        {
          name: "Celulares",
          originCountry: "España",
          finalCountry: "Colombia",
          departureDate: "2/6/24",
          arrivalDate: "26/10/24",
          status: "Travelling",
          provider: "Samsung",
          courier: "UPS"
        },
      ],
      columnDefs: [
        { field: "Seleccionar", maxWidth: 140, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: "Transportista", field: "courier", sortable: true, filter: true },
        { headerName: "Nombre", field: "name", sortable: true, filter: true },
        { headerName: "País de origen", field: "originCountry", sortable: true, filter: true },
        { headerName: "País de destino", field: "finalCountry", sortable: true, filter: true },
        { headerName: "Fecha de salida", field: "departureDate", sortable: true, filter: true },
        { headerName: "Fecha de llegada", field: "arrivalDate", sortable: true, filter: true },
        { headerName: "Estado", field: "status", sortable: true, filter: true },
        { headerName: "Proveedor", field: "provider", sortable: true, filter: true },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true
      },
      selectedItems: []
    };
  },
  computed: {
    groupedItems() {
      return this.dataModel.reduce((groups, item) => {
        const group = groups[item.courier] || [];
        group.push(item);
        groups[item.courier] = group;
        return groups;
      }, {});
    },
    selectedCount() {
      return this.selectedItems.length;
    }
  },
  methods: {
    startDrag(event, item) {
      // Iniciar el arrastre y pasar el objeto del item
      event.dataTransfer.setData("text/plain", JSON.stringify(item));
    },
    onDrop(event) {
      event.preventDefault();
      const item = JSON.parse(event.dataTransfer.getData("text/plain"));
      this.handleDrop(item);
    },
    handleDrop(item) {
      // Agregar el ítem soltado a droppedItems
      this.droppedItems.push({ ...item });
      // Usar Vue.set para que Vue detecte los cambios correctamente
      this.droppedItems = this.droppedItems.slice();
    },
    itemIsDropped(item) {
      // Verificar si el ítem ya está en droppedItems
      return this.droppedItems.some(droppedItem => droppedItem.name === item.name && droppedItem.courier === item.courier);
    },
    removeItems() {
      // Eliminar las filas seleccionadas de droppedItems
      this.droppedItems = this.droppedItems.filter(item => !this.selectedItems.includes(item));
      this.selectedItems = []; // Limpiar la selección después de eliminar
    },
    onSelectionChanged(event) {
      this.selectedItems = event.api.getSelectedRows();
    }
  },
  setup() {
    const rowSelection = ref('multiple');
    const gridApi = ref(null);

    const onGridReady = (params) => {
      gridApi.value = params.api;
    };

    return {
      gridApi,
      onGridReady,
      rowSelection
    };
  }
});
</script>

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
