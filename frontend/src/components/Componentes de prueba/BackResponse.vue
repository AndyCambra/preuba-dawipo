<template>
  <div class="container">
    <br>
    <p><strong>Back Response: </strong></p>
    <pre>{{ formattedData }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedData() {
      return JSON.stringify(this.data, null, 2);
    },
  },
};
</script>

<style scoped>
pre {
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
