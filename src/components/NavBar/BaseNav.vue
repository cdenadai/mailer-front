<template>
  <div class="nav-bar-gvm">
    <nav class="navbar navbar-light navbar-expand-md shadow-sm navigation-clean">
        <div class="container">
          <a class="navbar-brand text-monospace" href="#">GVM Mailer</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse"
                id="navcol-1">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item" role="presentation"><a class="nav-link text-monospace" href="/emails">Emails</a></li>
                    <!-- <li class="nav-item" role="presentation"><a class="nav-link text-monospace" href="/contas">Contas</a></li> -->
                    <li class="nav-item ">
                      <b-dropdown id="dropdownUsuario" variant="link" no-caret>
                        <template v-slot:button-content>
                          <div class="text-muted text-monospace">{{name}}</div>
                        </template>
                        <b-dropdown-item>Perfil</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click="logout">Sair</b-dropdown-item>
                      </b-dropdown>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', ['logout'])
  },
  computed: {
    ...mapGetters('auth', ['name'])
  }
}
</script>

<style scoped>
  .nav-bar-gvm {
    border-bottom: 1px solid rgb(255, 255, 255);
    box-shadow: 0px 0px 10px 0px #fefefe;
  }
</style>