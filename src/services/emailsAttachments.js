import api from './api';

export default {
    getByEmailId(id) {
        return api.get(`emails/${id}/files`);
    },

    delete(id) {
        return api.delete(`emails_attachments/${id}`);
    }
}