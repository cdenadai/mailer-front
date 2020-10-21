import emailsService from '../../services/emails';
import router from '../../router';

export const namespaced = true;

export const state = {
    emails: [],
    loadingMails: false,
    email: {},
    loadingMail: false,
    emailPreview: '',
    loadingEmailPreview: false,
    lastFiveSendedMails: [],
    loadingLastFiveSendedMails: false
}

export const mutations = {
    SET_EMAILS(state, data) {
        state.emails = data;
    },

    CLEAR_EMAILS(state) {
        state.emails = [] ;
    },

    SET_LOADING_EMAILS(state, loading) {
        state.loadingMails = loading;
    },

    SET_EMAIL(state, data) {
        state.email = data;
    },

    CLEAR_EMAIL(state) {
        state.email = {} ;
    },

    SET_LOADING_EMAIL(state, loading) {
        state.loadingMail = loading;
    },

    SET_EMAILS_LAST_FIVE_SENDED(state, data) {
        state.lastFiveSendedMails = data;
    },

    CLEAR_EMAILS_LAST_FIVE_SENDED(state) {
        state.lastFiveSendedMails = [] ;
    },

    SET_LOADING_EMAILS_LAST_FIVE_SENDED(state, loading) {
        state.loadingLastFiveSendedMails = loading;
    }
}

export const actions = {
    getAll({commit, dispatch, rootGetters}) {
        commit('SET_LOADING_EMAILS', true);

        let params = rootGetters['emails_params/allParams']

        emailsService.getAll(params)
        .then(
            (response) => {
                const {data, current_page, per_page, total } = response.data;
                commit('SET_EMAILS', data)
                dispatch('emails_params/setPagination', {current_page, per_page, total}, { root: true } );
            }
        ).catch(
            () => {
                commit('CLEAR_EMAILS');
            }
        ).then(
            () => {
                commit('SET_LOADING_EMAILS', false);
            }
        )
    },

    getById({commit}, id) {
        commit('SET_LOADING_EMAIL', true);

        emailsService.getById(id)
        .then(
            (response) => {
                commit('SET_EMAIL', response.data)
            }
        ).catch(
            () => {
                commit('CLEAR_EMAIL');
            }
        ).then(
            () => {
                commit('SET_LOADING_EMAIL', false);
            }
        )
    },

    getLastFiveSendedMails({commit}) {
        commit('SET_LOADING_EMAILS_LAST_FIVE_SENDED', true);

        emailsService.getLastFiveSendedMails()
        .then(
            (response) => {
                commit('SET_EMAILS_LAST_FIVE_SENDED', response.data)
            }
        ).catch(
            () => {
                commit('CLEAR_EMAILS_LAST_FIVE_SENDED');
            }
        ).then(
            () => {
                commit('SET_LOADING_EMAILS_LAST_FIVE_SENDED', false);
            }
        )
    },

    clearEmail({ commit }) {
        commit('CLEAR_EMAIL');
    },

    sendEmail({ commit, dispatch },id) {
        dispatch('clearEmail');

        emailsService.sendEmail(id)
        .then(
            (response) => {
                commit('SET_EMAIL', response.data)
            }
        ).catch(
            (error) => {
                dispatch('alert/showError', error, { root: true });
                dispatch('getById', id);
            }
        )
    },

    updateEmail({ commit, dispatch }, email) {
        commit('SET_LOADING_EMAIL', true);
        
        emailsService.update(email)
            .then((response) => { commit('SET_EMAIL', response.data) })
            .catch((error) => { dispatch('alert/showError', error, { root: true }) })
            .then(() => { commit('SET_LOADING_EMAIL', false) })
    },

    createEmail({ commit, dispatch }, email) {
        commit('SET_LOADING_EMAIL', true);
        
        emailsService.store(email)
            .then((response) => { router.push({ name: 'emailsEdit', params: { id: response.data.id }}) })
            .catch((error) => { dispatch('alert/showError', error, { root: true }) })
            .then(() => { commit('SET_LOADING_EMAIL', false) })
    }
}

export const getters = {
    emails: state => state.emails,
    loadingMails: state => state.loadingMails,
    email: state => state.email,
    loadingMail: state => state.loadingMail,
    lastFiveSendedMails: state => state.lastFiveSendedMails,
    loadingLastFiveSendedMails: state => state.loadingLastFiveSendedMails
}
