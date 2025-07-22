import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hexnex-t1j2.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
