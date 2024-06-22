<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

// Definir las propiedades del componente
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Computed para formatear los datos
const formattedData = computed(() => {
  return JSON.stringify(props.data, null, 2);
});
</script>

<template>
  <div class="container">
    <br />
    <p><strong>Back Response: </strong></p>
    <pre>{{ formattedData }}</pre>
  </div>
</template>

<style scoped>
pre {
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
