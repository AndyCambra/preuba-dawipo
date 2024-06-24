<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { user } from '../../utils/auth'
import MyConnections from '../Components/MyConnections.vue'
import MyOwnConnections from '../Components/MyOwnConnections.vue'
import ConnectionsDropContainer from '../Components/ConnectionsDropContainer.vue'

const droppedItems = ref([]); // Array to store dropped items

const route = useRouter();

const startDrag = (event, item) => {
  event.dataTransfer.setData("text/plain", JSON.stringify(item));
};

const onDrop = (event) => {
  event.preventDefault();
  const item = JSON.parse(event.dataTransfer.getData("text/plain"));
  handleDrop(item);
};

const handleDrop = (item) => {
  droppedItems.value.push(item);
  droppedItems.value = droppedItems.value.slice();
};

const itemIsDropped = (item) => {
  return droppedItems.value.some(droppedItem => droppedItem.courier === item.courier && droppedItem.img === item.img);
};

const removeItem = (item) => {
  droppedItems.value = droppedItems.value.filter(droppedItem => droppedItem !== item);
};

const navigateToCompleteCredentials = () =>{
  route.push('/complete-credentials')
}

</script>

<template>
  <div class="container">
    <div class="container-title">
      <h1>Bienvenido {{ user?.name }}</h1>
      <p>Gestionemos tus conectores.</p>
    </div>
    <div class="drag-section">
      <MyConnections :itemIsDropped="itemIsDropped" :startDrag="startDrag" />
      <MyOwnConnections :itemIsDropped="itemIsDropped" :startDrag="startDrag" />
      <ConnectionsDropContainer :droppedItems="droppedItems" :onDrop="onDrop" :removeItem="removeItem" />
    </div>
    <button class="btn-continuar" v-if="droppedItems.length" @click="navigateToCompleteCredentials" >Continuar</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
  align-items: self-start;
  gap: 3rem;
}
.btn-continuar{
  background-color: rgb(0,255,206);
  border: 1px solid rgb(0,255,206);
  color: black;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 250ms;
  margin-top: 1rem;
}

</style>