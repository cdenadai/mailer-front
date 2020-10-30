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
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        };

        console.log

        let formData = this.convertFormWithFile(body);

        return api.post('/emails', formData, config)
    },

    update(body) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        };

        let formData = this.convertFormWithFile(body);

        formData.append('_method', 'PUT');

        return api.post(`/emails/${body.id}`, formData, config);
    },

    convertFormWithFile(body) {
        let formData = new FormData();

        body.files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        delete body.files;

        Object.keys(body).forEach((key) => {
            formData.append(key, body[key]);
        })

        return formData; 
    }
}