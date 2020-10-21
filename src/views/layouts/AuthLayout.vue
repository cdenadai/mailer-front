<template>
  <div class="home">
    <base-nav></base-nav>

    <div class="d-flex w-100" style="height: 100%;">
      <zoom-center-transition :duration="pageTransitionDuration" mode="out-in" >
        <router-view></router-view>
      </zoom-center-transition>
    </div>

    <base-footer></base-footer>
  </div>
</template>

<script>
  import BaseNav from '../../components/NavBar/LoginNav';
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
.home {
    background: #04cdf109;
    height: 100vh;
    flex: 1;
  }
.footer-gvm {
  background-image: url('/imgs/background.jpg');
}
</style>
