<template>
    <div>
        <b-row>
            <b-col cols="6" sm="4" md="3">
                <b-form-group :label="filters.sended.text">
                    <b-form-select v-model="filters.sended.value" :options="filters.sended.options"></b-form-select>
                </b-form-group>
            </b-col>

            <b-col cols="6" sm="4" md="3">
                <b-form-group :label="filters.returned.text">
                    <b-form-select v-model="filters.returned.value" :options="filters.returned.options"></b-form-select>
                </b-form-group>
            </b-col>

            <b-col cols="6" sm="4" md="3">
                <b-form-group :label="filters.id.text">
                    <b-form-input v-model="filters.id.value"></b-form-input>
                </b-form-group>
            </b-col>

            <b-col cols="6" sm="4" md="3">
                <b-form-group :label="filters.id_task.text">
                    <b-form-input v-model="filters.id_task.value"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="12" lg="6">
                <input-with-condition :filter="filters.to"></input-with-condition>
            </b-col>

            <b-col md="12" lg="6">
                <input-with-condition :filter="filters.from"></input-with-condition>
            </b-col>
        </b-row>

        <b-row align-h="between" class="mx-0">
            <b-button variant="primary" @click="applyFilters">Aplicar Filtros</b-button>
            <b-button variant="secondary" @click="clearFilters">Limpar Filtros</b-button>
        </b-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import InputWithCondition from '../FiltersInputs/InputWithCondition';

export default {
    components: {
        InputWithCondition
    },
    computed: {
        ...mapGetters('emails_params', ['filters'])
    },
    methods: {
        ...mapActions('emails_params', ['setFilters', 'clearFilters']),
        ...mapActions('emails', ['getAll']),

        applyFilters() {
            this.setFilters(this.filters);
            this.getAll();
        }
    },

    created() {
        this.applyFilters();
    }
}
</script>

<style>

</style>
