<template>
    <div class="container">
      <h1>Tus empresas seleccionadas</h1>
      <p>Agregá tu número de cliente</p>
      <div v-if="selectedItems.length">
        <ul>
          <li v-for="(item, index) in selectedItems" :key="index">
            {{ item }}
            <label>Número de cliente</label>
            <input type="number" v-model="apiKey[index]" placeholder="api key">
          </li>
        </ul>
        <button @click="proceedToNextPage">Ir al Dashboard</button>
      </div>
      
      <div v-else>
        <p>No items selected</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SelectedItemsPage',
    data() {
      return {
        selectedItems: this.$route.query.droppedItems || [], 
        apiKey: []
      };
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
  