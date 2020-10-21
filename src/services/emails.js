import api from './api';

export default {
    getAll(params) {
        return api.get('/emails', {params});
    },

    getById(id) {
        return api.get(`/emails/${id}`,);
    },

    getLastFiveSendedMails() {
        return api.get('/emails/get/last5');
    },

    sendEmail(id) {
        return api.post(`/emails/${id}/send`,);
    },

    store(body) {
        // const config = { headers: { 'content-type': 'multipart/form-data' } };

        // let formData = new FormData();
        // formData.append(file);

        return api.post('/emails', { ...body })
    },

    update(body) {
        return api.put(`/emails/${body.id}`, { ...body });
    }
}