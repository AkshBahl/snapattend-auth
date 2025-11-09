import axios from 'axios';

// Backend API URL - update this to your deployed FastAPI URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: async (data: { name: string; email: string; password: string; faceImage: string }) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  loginFace: async (faceImage: string) => {
    const response = await api.post('/auth/login-face', { face_image: faceImage });
    return response.data;
  },
};

// Attendance APIs
export const attendanceAPI = {
  mark: async (faceImage: string) => {
    const response = await api.post('/attendance/mark', { face_image: faceImage });
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/attendance/all');
    return response.data;
  },
};

export default api;
