<template>
    <div>
      <div v-if="error">
        <p>Error: {{ error.message }}</p>
      </div>
      <div v-else>
        <div v-if="newData">
          <div v-for="item in newData" :key="item.id">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <img :src="`${item.thumbnail.path}.${item.thumbnail.extension}`" :alt="item.title" />
          </div>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CryptoJS from 'crypto-js';
  
  export default {
    data() {
      return {
        newData: null,
        error: null,
        urlMarvel: ''
      };
    },
    created() {
      this.generateHash();
    },
    watch: {
      urlMarvel(newUrl) {
        if (newUrl) {
          this.getData();
        }
      }
    },
    methods: {
      generateHash() {
        const TS = new Date().getTime().toString(); // Usar getTime para un TS simple
        const PUBLIC_KEY = 'c069d4a14edc3eaf3fd49d5743c06374';
        const PRIVATE_KEY = '4a348a836c3cc26b5cfcb9b771a661305ebe0a1e';
  
        const toHash = TS + PRIVATE_KEY + PUBLIC_KEY;
        const hash = CryptoJS.MD5(toHash).toString();
        const generatedUrl = `http://gateway.marvel.com/v1/public/comics?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hash}`;
        this.urlMarvel = generatedUrl;
      },
      async getData() {
        try {
          const response = await fetch(this.urlMarvel);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json(); // Parsear respuesta JSON
          this.newData = data.data.results; // Acceder a data.results
        } catch (error) {
          this.error = error;
        }
      }
    }
  };
  </script>
  
  <style>
  /* Tus estilos aquí */
  </style>
  