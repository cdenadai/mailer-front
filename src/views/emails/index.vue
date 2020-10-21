<template>
  <div>
      <b-breadcrumb :items="items" class="my-2 bg-app-color"></b-breadcrumb>

      <div class="card">
        <div class="card-header d-flex justify-content-between">
            <div>Seleção de E-mails</div>
            <b-button variant="success" size="sm" @click="goToNewEmailPage">
              <b-icon icon="plus" shift-v="-1"></b-icon> Novo
            </b-button>
        </div>

        <div class="card-body">
            <emails-filters></emails-filters>
        </div>

        <div class="card-body">
            <emails-table></emails-table>
        </div>

      </div>

      
  </div>
</template>

<script>
  import EmailsFilters from './components/Forms/EmailsFilters';
  import EmailsTable from './components/Tables/EmailsTable';

  export default {
    components: {
      EmailsFilters,
      EmailsTable
    },

    data() {
      return {
        items: [
          { text: 'Home', href: '/home' },
          { text: 'E-mails', active: true }
        ]
      }
    },

    methods: {
      goToNewEmailPage() {
        this.$router.push({ name: 'emailsCreate' })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .bg-app-color {
    background-color: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0,0,0,0.1);
  }
</style>