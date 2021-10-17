import axios from 'axios';
export const baseUrl="http://localhost";
export default axios.create({
    baseURL: `${baseUrl}`
});