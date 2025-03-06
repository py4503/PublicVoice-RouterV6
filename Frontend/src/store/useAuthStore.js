import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

const storedUser = JSON.parse(localStorage.getItem('authUser')); // ✅ Load user from localStorage

export const useAuthStore = create((set) => ({
    authUser: storedUser || null,  // ✅ Persist user session
    isCheckingAuth: false,
    isLoggingIn: false,
    department: storedUser?.department || null,  // ✅ Persist department

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data, department: res.data?.department || null });
            localStorage.setItem('authUser', JSON.stringify(res.data)); // ✅ Store user in localStorage
        } catch (error) {
            console.error('Error in checkAuth:', error);
            set({ authUser: null, department: null });
            localStorage.removeItem('authUser'); // ✅ Remove if authentication fails
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (data, navigate) => {
        console.log('Login function called with data:', data);
        set({ isLoggingIn: true });
    
        try {
            const res = await axiosInstance.post('/login', data);
            console.log('Response received from server:', res);
    
            if (res?.data) {
                set({ authUser: res.data.user });  // Ensure only user data is stored
                set({ department: res.data.user.department }); // ✅ Store department separately
                toast.success('User logged in successfully');
    
                localStorage.setItem('authUser', JSON.stringify(res.data.user)); // Store only user data
    
                // ✅ Redirect to HomePage
                navigate('/home');
            }
        } catch (error) {
            console.log('Login Error:', error);
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            console.log('Login process completed');
            set({ isLoggingIn: false });
        }
    },
    

    logout: () => {  // ✅ Logout function to clear session
        set({ authUser: null, department: null });
        localStorage.removeItem('authUser'); // ✅ Remove from storage
        toast.success('Logged out successfully');
    },
}));
