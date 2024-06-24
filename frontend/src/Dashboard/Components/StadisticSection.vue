<script setup>
import { Profile, Settings } from './icons'
import { useRouter } from 'vue-router';
import { user } from '@/utils/auth';

const route = useRouter()

const navigateToManageConnectors = () =>{
    route.push('/manage-connectors')
}
const navigateToCreateConnectors = () =>{
    route.push('/create-connector')
}

</script>


<template>
    <div class="container-stats">

            <div class="title-box"> <h1 class="title"> Dashboard</h1></div>
            <div class="stats-box">  
            <div class="min-section">
                <p class="stats-name">Conectores activos</p>
                <p class="stats-number">3</p>
            </div>
            <div class="min-section">
                <p class="stats-name">Conectores ingresados</p>
                <p class="stats-number">12</p>
            </div>
            
            <div class="min-section">
                <p class="stats-name">Estado</p>
                <p class="stats-number">Ok</p>
            </div>
            <div class="min-section">
                <p class="stats-name">Última conexión</p>
                <p class="stats-number">5:00am</p>
            </div>
            <div class="min-section">
                <p class="stats-name">Conexiones este mes</p>
                <p class="stats-number">34</p>
            </div>
            <div class="min-section">
                <p class="stats-name">Usuario</p>
                <p class="stats-number">{{ user?.name }}</p>
            </div>
            </div> 
            <div class="min-section-last">
                <button v-html="Profile" @click="navigateToManageConnectors" class="btn-static-dashboard"></button> 
                <button v-html="Settings" class="btn-static-dashboard" @click="navigateToCreateConnectors" ></button> 
            </div>

    </div>
</template>
<style>
.container-stats{
    width: 100%;
    padding: 0px 0px 8px;
    height: 72px;
    display: flex;
    gap: 8px;
    justify-content: space-between;
}
.title-box{
    width: 265px;
}
.stats-box{
    display: flex;
    gap: 8px;
    flex-grow: 2;
    justify-content: space-between;
}
.title{
    font-size: 24px;
    font-weight: 500;
    margin: 0;
}
.min-section{
    background-color: rgb(224, 224, 223);
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    min-width: 13%;
}
.stats-name{
    font-weight: 500;
    margin: 0;
    font-size: 14px
}
.stats-number{
    font-weight: 700;
    font-size: 24px;
    margin: 0;
    color: rgb(71, 70, 70);
    
}
.min-section-last{
    display: flex;
    flex-direction: column;
    background-color: rgb(224, 224, 223);
    padding: 4px 8px;
    border-radius: 8px;
}
.btn-static-dashboard{
    cursor: pointer;
    background-color: transparent;
    border: none;
}
</style>