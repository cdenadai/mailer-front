<template>
  <div class="home">
    <base-nav></base-nav>

    <div class="container" style="height: 100%;">
      <zoom-center-transition :duration="pageTransitionDuration" mode="out-in" >
        <router-view></router-view>
      </zoom-center-transition>
    </div>

    <base-footer></base-footer>
  </div>
</template>

<script>
  import BaseNav from '../../components/NavBar/BaseNav';
  import BaseFooter from '../../components/BaseFooter';
  import { ZoomCenterTransition } from 'vue2-transitions';

  export default {
    components: {
      BaseNav,
      ZoomCenterTransition,
      BaseFooter
    },
    data() {
      return {
        menuTransitionDuration: 250,
        pageTransitionDuration: 200
      };
    },
  };
</script>

<style lang="scss">

</style>
