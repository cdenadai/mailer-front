<template>
    <footer class="fixed-bottom">

        <b-row align-v="center" align-h="between" class="mx-4">
          <div class="copyright text-muted text-monospace">
            © {{year}} <a href="https://www.gvmsistemas.com.br" class="font-weight-bold ml-1 text-muted" target="_blank">GVM Sistemas</a>
          </div>

          <div v-if="loggedIn" class="text-muted text-monospace">
              Logado como: {{name}}
          </div>
        </b-row>

    </footer>   
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('auth', ['name', 'loggedIn']),
        year() {
          return new Date().getFullYear()
        }
    }
}
</script>

<style>

</style>