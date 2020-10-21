import api from './api';

export default {
    uploadFile(file, email_id) {
        const config = { headers: { 'content-type': 'multipart/form-data' } };

        let formData = new FormData();
        formData.append(file);

        return api.post(`/emails/${email_id}/files`, formData, config);
    }
}