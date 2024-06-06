<template>
  <div class="card-container">
    <div
      class="drag-el card"
      v-for="(item, index) in pokeData"
      :key="index"
      draggable
      @dragstart="startDrag($event, item)"
      @dragover.prevent
      @drop="onDrop($event, item)"
    >
      <p key="{{" item.name }}>{{ item.name }}</p>
      <button @click="handleClick(item.url)">GO</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokeData: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(url) {
      window.open(url, "_blank");
    },
    startDrag(event, item) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("item", JSON.stringify(item));
    },
    onDrop(event, targetItem) {
      const draggedItem = JSON.parse(event.dataTransfer.getData("item"));

      // Find the indices of the dragged and target items
      const draggedIndex = this.pokeData.findIndex(
        (pokemon) => pokemon.name === draggedItem.name,
      );
      const targetIndex = this.pokeData.findIndex(
        (pokemon) => pokemon.name === targetItem.name,
      );

      // Swap the positions of the dragged item and the target item
      this.$emit("updatePokeData", { draggedIndex, targetIndex });
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.drag-el {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  cursor: move;
}

/* Tus estilos adicionales aquí */
</style>
