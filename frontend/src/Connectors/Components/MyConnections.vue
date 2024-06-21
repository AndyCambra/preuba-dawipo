<script setup>
import { ref, computed, defineProps } from 'vue'
import DHL from '../../../public/DHL.png'
import Maersk from '../../../public/Maersk.png'
import MSC from '../../../public/MSC.png'

const props = defineProps(['itemIsDropped', 'startDrag'])

const dataModel = ref([
  { img: DHL, courier: "DHL Global Fowarding", name: "DHL Global Fowarding"},
  { img: Maersk, courier: "Maersk", name: "Maersk" },
  { img: MSC, courier: "Mediterranean Shipping Company", name: "Mediterranean Shipping Company"},
]);

const groupedItems = computed(() => {
  return dataModel.value.reduce((groups, item) => {
    const group = groups[item.courier] || [];
    group.push(item);
    groups[item.courier] = group;
    return groups;
  }, {});
});

</script>

<template>
  <div>
    <h2>Mis Conexiones</h2>
    <div class="drag-inside">
      <div class="drag-container" v-for="(items, courier) in groupedItems" :key="courier">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'drag-el': true, disabled: props.itemIsDropped(item) }"
          @dragstart="props.startDrag($event, item)"
          :draggable="!itemIsDropped(item)"
        >
          <div class="drag-connectors">
            <img :src="item.img" alt="">
            <h3>{{ item.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>