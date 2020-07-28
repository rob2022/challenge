import axios from 'axios';
const client = axios.create({
    timeout: 1000,
    headers: {'X-Requested-With': 'XMLHttpRequest'}
});

export default {
    get(url) {
        return client.get(url);
    },

    postData(url, formData) {
        return client.post(url, formData);
    }
}
