<template>
    <b-modal 
        v-model="showModal" 
        title="Visualização de E-mail" 
        centered 
        size="xl" 
        id="modalEmailPreview" 
        ok-only
    >
       <b-embed type="iframe" aspect="16by9" :src="route()" allowfullscreen ></b-embed>
    </b-modal>
</template>

<script>

export default {
    data() {
        return {
            emailId: 0,
            showModal: false
        }
    },
    methods: {
        route() {
            return `http://localhost:8000/emails/${this.emailId}/preview`
        },

        showPreviewModal(id) {
            this.showModal = true;
            this.emailId = id;
        }
    }
}
</script>

<style>

</style>
