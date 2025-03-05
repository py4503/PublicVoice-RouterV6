import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Ensure this matches your backend
  withCredentials: true, // Required for cookies & authentication
});