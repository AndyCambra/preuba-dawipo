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
              :class="{ 'drag-el': true, disabled: droppedItems.includes(item) }"
              @dragstart="startDrag($event, item)"
              :draggable="!droppedItems.includes(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="drop-area" @dragover.prevent @drop="onDrop">
          <h2>Soltar acá</h2>
          <table class="table" v-if="droppedItems.length">
            <thead>
              <tr>
                <th>Transportista</th>
                <th>Nombre</th>
                <th>País de origen</th>
                <th>País de destino</th>
                <th>Fecha de salida</th>
                <th>Fecha de llegada</th>
                <th>Estado</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in droppedItems" :key="index">
                <td>{{ item.courier }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.originCountry }}</td>
                <td>{{ item.finalCountry }}</td>
                <td>{{ item.departureDate }}</td>
                <td>{{ item.arrivalDate }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.provider }}</td>
                <td><button @click="removeItem(index)">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
          <p v-else>No items dropped</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashPrueba",
    data() {
      return {
        droppedItems: [], // Array to store dropped items
        dataModel: [
          {
            name: "productName1",
            originCountry: "USA",
            finalCountry: "Colombia",
            departureDate: "20/9/24",
            arrivalDate: "24/11/24",
            status: "Processing",
            provider: "Esxxxe",
            courier: "DHL"
          },
          {
            name: "productName2",
            originCountry: "USA",
            finalCountry: "Chile",
            departureDate: "2/8/24",
            arrivalDate: "11/10/24",
            status: "Processing",
            provider: "Samsung",
            courier: "DHL"
          },
          {
            name: "productName3",
            originCountry: "USA",
            finalCountry: "Colombia",
            departureDate: "2/6/24",
            arrivalDate: "11/10/24",
            status: "Travelling",
            provider: "Samsung",
            courier: "UPS"
          }
        ]
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
        // Verificar si el ítem ya está en droppedItems para evitar duplicados
        const itemExists = this.droppedItems.some(droppedItem => droppedItem.name === item.name);
        if (!itemExists) {
          this.droppedItems.push(item); // Add the dropped item to the array
        }
      },
      removeItem(index) {
        this.droppedItems.splice(index, 1); // Remove the item from the array
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-left: 20px;
  }
  .drag-inside {
    display: flex;
    flex-direction: column;
    padding: 4px;
    box-sizing: border-box;
    background-color: #d6d3d3;
  }
  .drag-section {
    display: flex;
  }
  
  .drag-container {
    display: flex;
    flex-direction: column;
    width: 20%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 400;
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
  
  .disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
  
  .drop-area {
    padding: 20px;
    border: 2px dashed #ccc;
    width: 980px;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 400;
  }
  
  .drop-area .dropped-item {
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    width: 100%;
  }
  
  .drop-area p {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 400;
  }
  
  .table {
    border: 1px solid #c3c3c3;
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    border: 1px solid #c3c3c3;
    background-color: rgb(149, 167, 169);
    color: white;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 400;
  }
  
  td {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 300;
    padding-left: 6px;
    border: 1px solid #c3c3c3;
  }
  
  tr {
    border-bottom: 1px solid #eb0a0a;
    margin: 2px 0;
  }
  
  button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
  }
  
  button:hover {
    background-color: #d32f2f;
  }
  </style>
  