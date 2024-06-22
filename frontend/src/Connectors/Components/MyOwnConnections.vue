<script setup>
import { ref, defineProps, computed } from 'vue'
import { useRouter } from 'vue-router';
import Otra from '../../../public/Otra.png'

const route = useRouter()
const props = defineProps(['itemIsDropped', 'startDrag'])

const dataModelOwn = ref([
  { img: Otra, courier: "Otra", name: "Otra"}
]);

const groupedItemsOwn = computed(() => {
  return dataModelOwn.value.reduce((groups, item) => {
    const group = groups[item.courier] || [];
    group.push(item);
    groups[item.courier] = group;
    return groups;
  }, {});
});

const navigateToCreateConnector = () =>{
  route.push('/create-connector')
}
</script>

<template>
  <div class="drag-connectors-own">
    <p class="connectors-text">Elegi entre estas conexiones y arrastralas a la zona punteada</p>
    <div class="drag-inside-own">
      <div class="drag-container" v-for="(items, courier) in groupedItemsOwn" :key="courier">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'drag-el': true, disabled: props.itemIsDropped(item) }"
          @dragstart="props.startDrag($event, item)"
          :draggable="!itemIsDropped(item)"
        >
          <div class="drag-connectors">
            <img :src="item.img" alt="Logo de la empresa de logistica">
            <h3>{{ item.name }}</h3>
          </div>
        </div>
      </div>
      <button @click="navigateToCreateConnector">O crea una conexion personalizada</button>
    </div>
  </div>
</template>

<style scoped>
.drag-connectors-own{
  display: flex;
  flex-direction: column;
  align-items: center;
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
.connectors-text{
  width: 20.5rem;
  text-align: center;
  align-self: center;
}
</style>