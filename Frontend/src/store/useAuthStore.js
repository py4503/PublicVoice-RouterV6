import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

 export const useAuthStore = create((set) =>({
        authUser:null,
        isCheckingAuth: true,

    checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.error('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login : async (data) => {
   
    console.log('Login function called with data:', data);
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post('/login', data);
      console.log('Response received from server:', res);

      if (res?.data) {
        set({ authUser: res.data });
        toast.success('User logged in successfully');

        localStorage.setItem('authUser', JSON.stringify(res.data));
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      console.log('Login process completed');
      set({ isLoggingIn: false });
    }
  


},


 
}))

