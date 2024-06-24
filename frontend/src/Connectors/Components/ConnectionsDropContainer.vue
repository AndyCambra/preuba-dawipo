<script setup>
import { defineProps} from  'vue'

const props = defineProps({
  droppedItems: Array,
  onDrop: Function,
  removeItem: Function
})
</script>

<template>
  <div class="drop-container">
    <p class="connectors-text">Suelta aqui las conexiones seleccionadas.</p>
    <div class="drop-area-connectors" @dragover.prevent @drop="props.onDrop">
      <div v-if="droppedItems.length">
        <div v-for="(item, index) in props.droppedItems" :key="index" class="dropped-item">
          <div class="drag-connectors-items">
            <div class="drop-items">
              <img :src="item.img" alt="">
              <h3>{{ item.courier }}</h3>
            </div>
            <button class="drop-items-delete" @click="props.removeItem(item)">X</button>
          </div>
        </div>
      </div>
      <p class="drop-area-message" v-else>Drop</p>
    </div>
  </div>
</template>

<style scoped>
.connectors-text{
  width: 20.5rem;
  text-align: center;
  align-self: center;
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
.drop-area-connectors {
  flex-grow: 1;
  border: 2px dashed rgb(0,255,206);
  background-color: #fafafa;
  border-radius: 15px;
  min-height: 26.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.3rem;
}
.drop-items{
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid gray;
  border-radius: 50px;
  padding: 0.5rem;
  width: 14rem;
  margin-bottom: 0.5rem;
}
.drop-area-message{
  align-self: center;
  font-weight: 600;
  font-size: 2rem;
  color: gray
}
</style>