<template>
    <div>
        <b-table
            striped
            hover
            responsive
            :stacked="stacked"
            :items="emails"
            :fields="fields"
            :busy="loadingMails"
            :sort-by.sync="sort.sortBy"
            :sort-desc.sync="sort.sortDesc"
            @sort-changed="onChangeTableSort"
            no-sort-reset
        >
            <template v-slot:table-busy>
                <loading></loading>
            </template>

             <template v-slot:cell(dests)="data">
                {{ firstThyrdLetters(data.item.dests) }}
            </template>

            <template v-slot:cell(actions)="data">
                <b-row align-v="center">
                    <b-button @click="goToEmailRegister(data.item.id)" size="sm" variant="link">
                        <b-icon-pencil variant="info"></b-icon-pencil>
                    </b-button>

                     <b-button @click="openEmailPreviewModal(data.item.id)" size="sm" variant="link">
                        <b-icon-envelope variant="success"></b-icon-envelope>
                    </b-button>
                </b-row>
            </template>
        </b-table>

        <b-pagination
            v-model="pagination.page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            align="right"
            pills
            @input="onChangeTablePage()"
        ></b-pagination>

        <emails-preview-modal ref="emailsPreviewModal"></emails-preview-modal>
    </div>

</template>

<script>
import breakpointsUtils from '../../../../utils/BreakpointUtils';
import EmailsPreviewModal from '../Modals/EmailsPreviewModal';
import Loading from '../../../../components/Loading'; 

import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            emailId: null,
            showPreviewModal: false
        }
    },
    components: {
        EmailsPreviewModal,
        Loading
    },
    computed: {
        ...mapGetters('emails', ['emails', 'loadingMails']),
        ...mapGetters('emails_params', ['pagination', 'sort']),

        stacked: () => breakpointsUtils.screen.lt.sm,

        fields: function() {
            return [
                { key: 'id', label: 'ID', sortable: true},
                { key: 'remetente', sortable: true},
                { key: 'dests', label: 'Destinatário', sortable: false},
                { key: 'assunto', label: 'Assunto', sortable: true},
                { key: 'status', label: 'Status', sortable: false},
                { key: 'actions', label: 'Ações', sortable: false}
            ]
        },
    },

    methods: {
        ...mapActions('emails', ['getAll']),
        ...mapActions('emails_params', ['setPagination', 'setSort']),

        onChangeTablePage() {
            this.pagination.current_page = this.pagination.page;
            this.setPagination(this.pagination);
            this.getAll();
        },

        onChangeTableSort(ctx) {

            let newSort = {
                sortBy: ctx.sortBy,
                sortDesc: ctx.sortDesc
            }

            this.setSort(newSort);
            this.getAll();
        },

        goToEmailRegister(id) {
            this.$router.push({ name: 'emailsEdit', params: { id: id }});
        },

        openEmailPreviewModal(id) {
            this.$refs.emailsPreviewModal.showPreviewModal(id);
        },

        firstThyrdLetters(value) {
            let length = value.length > 40 ? 40 : value.length; 
            return value.substr(0, length);
        }
    }
}
</script>

<style>

</style>
