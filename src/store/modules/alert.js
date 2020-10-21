export const namespaced = true;

export const state = {
    alert: {
        show: false,
        message: '',
        color: 'warning'
    }
}

export const mutations = {
    SET_ALERT(state, alert) {
        state.alert = alert;
    },

    CLEAR_ALERT(state) {
        state.alert = {
            show: false,
            message: '',
            color: 'secondary'
        };
    }
}

export const actions = {
    showError({ commit }, message) {

        let alert = { show: true, message: message, color: 'danger' };

        commit('SET_ALERT', alert);
    },

    showWarning({ commit }, message) {

        let alert = { show: true, message: message, color: 'warning' };

        commit('SET_ALERT', alert);
    },

    showSuccess({ commit }, message) {

        let alert = { show: true, message: message, color: 'success' };

        commit('SET_ALERT', alert);
    },

     showInfo({ commit }, message) {

        let alert = { show: true, message: message, color: 'info' };

        commit('SET_ALERT', alert);
    },
}

export const getters = {
    alert: state => state.alert,
}
