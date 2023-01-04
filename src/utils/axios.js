import axios from 'axios';

// creating an instance of axios with Base URL for calling the endpoints
const instance = axios.create({
  baseURL: 'https://test.zyax.se/'
});

export default instance;