import axios from 'axios';
export const baseUrl = 'http://192.168.0.110:5001';
const baseService = axios.create({
    baseURL: baseUrl
});
export default baseService;