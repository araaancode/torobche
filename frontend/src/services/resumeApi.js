import axios from './axiosConfig';

export const createResume = (data) => axios.post('/resumes', data);
export const getResume = (id) => axios.get(`/resumes/${id}`);
export const updateResume = (id, data) => axios.put(`/resumes/${id}`, data);
export const getMyResume = () => axios.get('/resumes/me/resume');
export const getQRCode = (id) =>
    axios.get(`/resumes/${id}/qr`, {
        responseType: 'blob'
    });