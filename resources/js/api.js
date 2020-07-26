import axios from 'axios';
const client = axios.create({
    baseURL: '/api',
    timeout: 1000,
    headers: {'X-Requested-With': 'XMLHttpRequest'}
});

export default {
    getFormSchema() {
        return client.get('form-schema');
    }
}
