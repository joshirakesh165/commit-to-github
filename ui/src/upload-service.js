import axios from 'axios';

const endPoint = 'https://commit-to-github.onrender.com/upload';
const uploadFile = async (formData) => {
    try {
        const headers = {
            'content-type': 'multipart/form-data'
        };
        let response = await axios.post(endPoint, formData, { headers });
        return response ? response.message : null;
    } catch (e) {
        console.log('error');
    } 
}

export default uploadFile;