<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { user } from '../../utils/auth'
import DHL from '../../../public/DHL.png'
import Maersk from '../../../public/Maersk.png'
import MSC from '../../../public/MSC.png'
import Otra from '../../../public/Otra.png'

const droppedItems = ref([]); // Array to store dropped items
const loading = ref(false);
const router = useRouter();

const dataModel = ref([
  { img: DHL, courier: "DHL Global Fowarding"},
  { img: Maersk, courier: "Maersk" },
  { img: MSC, courier: "Mediterranean Shipping Company"},
]);

const dataModelOwn = ref([
  { img: Otra, courier: "Otra" }
]);

const groupedItems = computed(() => {
  return dataModel.value.reduce((groups, item) => {
    const group = groups[item.courier] || [];
    group.push(item);
    groups[item.courier] = group;
    return groups;
  }, {});
});

const groupedItemsOwn = computed(() => {
  return dataModelOwn.value.reduce((groups, item) => {
    const group = groups[item.courier] || [];
    group.push(item);
    groups[item.courier] = group;
    return groups;
  }, {});
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="drag-connectors-own">
        <p class="connectors-text">Elegi entre estas conexiones y arrastralas a la zona punteada</p>
        <div class="drag-inside-own">
          <div class="drag-container" v-for="(items, courier) in groupedItemsOwn" :key="courier">
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
              </div>
            </div>
          </div>
          <button>O crea una conexion personalizada</button>
        </div>
      </div>
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
.drag-inside-own{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1rem;
  border: 2px solid gray;
  border-radius: 25px;
  min-height: 25rem;
}

.drag-inside-own button{
  background-color: transparent;
  border: 1px solid rgb(0,255,206);
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
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
.drag-connectors-own{
  display: flex;
  flex-direction: column;
  align-items: center;
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