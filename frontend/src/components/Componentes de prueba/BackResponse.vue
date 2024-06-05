<template>
    <div class="container">
      <br>
      <p><strong>Back Response: </strong>{{data}}</p>      
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  