import axios from 'axios';

const service = axios.create({
      withCredentials: true,  // 因为axios默认不发送cookie，所以增加一个配置让它发送cookie，用于后台鉴权
      timeout: 5000
    }
);

export default service;