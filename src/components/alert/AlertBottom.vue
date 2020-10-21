<template>
    <b-alert v-model="alert.show" 
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      :variant="alert.color"
      dismissible
    >
        {{alert.message}}
    </b-alert>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('alert', ['alert'])
    }
}
</script>

<style>

</style>