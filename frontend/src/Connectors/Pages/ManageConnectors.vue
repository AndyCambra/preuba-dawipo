<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { user } from '../../utils/auth'
import MyConnections from '../Components/MyConnections.vue'
import MyOwnConnections from '../Components/MyOwnConnections.vue'


const droppedItems = ref([]); // Array to store dropped items
const loading = ref(false);
const router = useRouter();

const startDrag = (event, item) => {
  event.dataTransfer.setData("text/plain", JSON.stringify(item));
};

const onDrop = (event) => {
  event.preventDefault();
  const item = JSON.parse(event.dataTransfer.getData("text/plain"));
  handleDrop(item);
};

const handleDrop = (item) => {
  loading.value = true;
  droppedItems.value.push(item);
  droppedItems.value = droppedItems.value.slice();
  loading.value = false;
};

const itemIsDropped = (item) => {
  return droppedItems.value.some(droppedItem => droppedItem.courier === item.courier && droppedItem.img === item.img);
};

const removeItem = (item) => {
  droppedItems.value = droppedItems.value.filter(droppedItem => droppedItem !== item);
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
      <MyConnections :itemIsDropped="itemIsDropped" :startDrag="startDrag" />
      <MyOwnConnections :itemIsDropped="itemIsDropped" :startDrag="startDrag" />
      <div class="drop-container">
        <p class="connectors-text">Suelta aqui las conexiones seleccionadas.</p>
        <div class="drop-area" @dragover.prevent @drop="onDrop">
          <div v-if="droppedItems.length">
            <div v-for="(item, index) in droppedItems" :key="index" class="dropped-item">
              <div class="drag-connectors-items">
                <div class="drop-items">
                  <img :src="item.img" alt="">
                  <h3>{{ item.courier }}</h3>
                </div>
                <button class="drop-items-delete" @click="removeItem(item)">X</button>
              </div>
            </div>
          </div>
          <p v-else>No items dropped</p>
        </div>
      </div>
    </div>
    <button class="btn-continuar" v-if="droppedItems.length">Continuar</button>
  </div>
  <button @click="navigateToHome">
      Go to Home
  </button>
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
  width: 3.5rem;
  height: 3.5rem;
}
.drag-connectors-items{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drag-connectors-items h3{
  font-weight: 500;
  font-size: 0.9rem;
  max-width: 200px;
}

.drop-items-delete{
  font-size: 1.5rem;
  color: gray;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 50%;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: all 250ms;
}
.drop-items-delete:hover{
  color: white;
  background-color: black;
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
.connectors-text{
  width: 20.5rem;
  text-align: center;
  align-self: center;
}
.drop-area {
  flex-grow: 1;
  border: 2px dashed rgb(0,255,206);
  background-color: #fafafa;
  border-radius: 15px;
  min-height: 24.5rem;
}
.drop-items{
  display: flex;
  gap: 0.5rem;
  align-items: center;
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