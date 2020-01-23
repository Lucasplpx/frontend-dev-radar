import { create } from 'axios';

const api = create({
    baseURL: "http://localhost:3000",
});

export default api;