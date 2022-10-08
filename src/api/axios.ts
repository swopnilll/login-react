import axios from 'axios';

const BASE_URL = "http://localhost:3011";

export default axios.create({
    baseURL: BASE_URL,
});

