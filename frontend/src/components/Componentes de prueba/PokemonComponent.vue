<template>
  <div class="container">
    <h2>Lista de Pokemones</h2>
    <PokeCard :pokeData="pokeData" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import PokeCard from "./PokeCard.vue";
import axios from "axios";

const POKE_API = "https://pokeapi.co/api/v2/pokemon?limit=1302";

export default {
  components: {
    PokeCard,
  },
  setup() {
    const pokeData = ref([]);
    const error = ref(null);

    const getData = async () => {
      try {
        const response = await axios.get(POKE_API);
        const data = await response.json();
        pokeData.value = data.results;
      } catch (err) {
        error.value = err;
      }
    };

    onMounted(() => {
      getData();
    });

    return {
      pokeData,
      error,
    };
  },
};
</script>

<style scoped>
.container {
  /* Tus estilos aquí */
}
</style>
