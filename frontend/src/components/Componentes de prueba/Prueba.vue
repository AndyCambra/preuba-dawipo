<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div>
        <h1>{{ message }}</h1>
        <button @click="changeMessage">Cambiar</button>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default{
    computed:{
        ...mapState(['message'])
    },
    methods: {
        ...mapMutations(['setMessage']),
        changeMessage() {
            this.setMessage('Hola a todos prueba')
        }
    }
}
</script>






<!-- <template>
    <div>
        <h1 v-bind:class="{highligthed: isHighlighted}">{{ title }}</h1>
        <button @click="toggleHighlight">Toggle Color</button>
        <input v-model="message">
        <ul>
            <li v-for="item in list" :key="item.id">{{ item.text }}</li>
        </ul>
    </div>
</template>

<style scoped>
.highligthed{
    color:gold;
}</style>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Prueba",
    data() {
        return {
            message: 'Hello',
            title: "Es el título de Pueba",
            isHighlighted: false,
            isVisible: true,
            list:[
                { id:1, text:'Elemento 1'},
                { id:2, text:'Elemento 2'},
                { id:3, text:'Elemento 3'},
            ]        }
    },
    methods:{
    toggleVisibility() {
        this.isVisible =!this.isVisible;
    },
    sayMyName(){
        alert("Andy");
    },
    toggleHighlight(){
        this.isHighlighted =!this.isHighlighted;
    }
    }
}
</script> -->