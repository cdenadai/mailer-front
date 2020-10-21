<template>
<div class="nav-bar-gvm">
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand href="/welcome" class="text-monospace">GVM Mailer</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/login" class="text-monospace">Login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .nav-bar-gvm {
    border-bottom: 1px solid rgba(255, 255, 255, .2);
    box-shadow: 0px 0px 10px 0px #888;
    background-image: url('/imgs/background.jpg');
  }
</style>