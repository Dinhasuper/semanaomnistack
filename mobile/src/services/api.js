import axios from 'axios';

const api = axios.create({
  baseURL:'http://192.168.1.65:3333' //ip do celular
});

export default api;