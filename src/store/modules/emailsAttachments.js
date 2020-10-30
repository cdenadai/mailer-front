import emailsAttachmentsService from '../../services/emailsAttachments';

export const namespaced = true;

export const state = {
    attachments: [],
    loadingAttachments: false
}

export const mutations = {
    SET_EMAILS_ATTACHMENTS(state, data) {
        state.attachments = data;
    },

    CLEAR_EMAILS_ATTACHMENTS(state) {
        state.attachments = [] ;
    },

    SET_LOADING_EMAILS_ATTACHMENTS(state, loading) {
        state.loadingAttachments = loading;
    }
}

export const actions = {
    getByEmailId({commit, dispatch}, id) {
        commit('SET_LOADING_EMAILS_ATTACHMENTS', true);

        emailsAttachmentsService.getByEmailId(id)
            .then((response) => { commit('SET_EMAILS_ATTACHMENTS', response.data)})
            .catch((error) => { dispatch('alert/showError', error, { root: true })})
            .then(() => { commit('SET_LOADING_EMAILS_ATTACHMENTS', false)})
    },

    delete({ commit, dispatch }, id) {
        commit('SET_LOADING_EMAILS_ATTACHMENTS', true);

        emailsAttachmentsService.delete(id)
            .then(() => { dispatch('alert/showSuccess', 'Anexo removido com sucesso', { root: true })})
            .catch((error) => { dispatch('alert/showError', error, { root: true })})
            .then(() => {commit('SET_LOADING_EMAILS_ATTACHMENTS', false)}
        )
    }
}

export const getters = {
    attachments: state => state.attachments,
    loadingAttachments: state => state.loadingAttachments
}
