<template>
    <div>
        <small>Anexos Salvos</small>
        <b-list-group>
            <b-list-group-item 
                class="d-flex justify-content-between align-items-center"
                v-for="attachment in attachments" :key="attachment.id"
            >
                <div>{{attachment.name}}</div>
                <b-icon 
                    icon="x-circle" 
                    scale="2"
                    shift-v="6"
                    variant="danger"
                    title="Remover Anexo"    
                    class="btn"
                    @click="deleteAttachment(attachment.id)"
                ></b-icon>
                
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: ['emailId'],
    methods: {
        ...mapActions('emails_attachments', ['getByEmailId', 'delete']),

        deleteAttachment(id) {
            this.delete(id);
            this.getByEmailId(this.emailId);
        }
    },
    computed: {
        ...mapGetters('emails_attachments', ['attachments', 'loadingAttachments'])
    },
    created() {
        this.getByEmailId(this.emailId);
    }
}
</script>

<style>

</style>