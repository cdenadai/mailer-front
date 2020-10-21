import axios from 'axios';

export default {
    login(data) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URL}/login`, {...data});
    }
}