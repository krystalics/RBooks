import axios from 'axios';

const service = axios.create({
      withCredentials: true,
      timeout: 5000
    }
);

export default service;