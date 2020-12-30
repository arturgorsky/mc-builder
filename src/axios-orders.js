import axios from 'axios';
import secretURL from './secret';

const instance = axios.create({
    baseURL: secretURL,
});


export default instance;