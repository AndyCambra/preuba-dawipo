<template>
  <div class="">
    <h1>Mi Dashboard</h1>
      <div class="" v-for="key in userKeys" :key="key">
        <p>{{ key }}</p>
      </div>
  </div>
</template>

<script>
  export default{
    name:'UserDashboard',
    data(){
      return{
        userKeys: this.$route.query.userKey || []
      };
    },
  }
</script>