import axios from 'axios';
const uploadFile = async (url, formData) => {
    let requestUrl = '';
    try {
        const headers = {
            'content-type': 'multipart/form-data'
        };
        let response = await axios.post("http://localhost:8000/upload", formData, { headers });
        return response ? response.data : null;
    } catch (e) {
        console.log('error');
    } 
}

export default uploadFile;