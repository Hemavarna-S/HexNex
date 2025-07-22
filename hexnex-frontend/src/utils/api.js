import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hexnex-t1j2.onrender.com/api', // 👈 IMPORTANT: add /api because your backend uses app.use('/api')
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
