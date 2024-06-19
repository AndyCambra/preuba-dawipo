<template>
  <div class="poke-card">
    <div v-for="(pokemon, index) in pokeData" :key="index">
      <p>{{ pokemon.name }}</p>
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
};
</script>

<style scoped>
.poke-card {
  /* Tus estilos aquí */
}
</style>
