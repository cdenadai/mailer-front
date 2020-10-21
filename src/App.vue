<template>
  <div id="app">
    <router-view :key="$route.path"/>
    <alert-bottom></alert-bottom>
  </div>
</template>

<script>
  import AlertBottom from './components/alert/AlertBottom';

  export default {
    components: {
      AlertBottom
    }
  }
</script>

<style lang="scss">
#app {
  font-family: monospace, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
