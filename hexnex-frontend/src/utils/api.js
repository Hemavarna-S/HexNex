import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hexnex-1.onrender.com', // 👈 IMPORTANT: add /api because your backend uses app.use('/api')
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
