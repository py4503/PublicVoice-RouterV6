import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const [formData, setFormData] = useState({ userId: '', password: '', department: '' });
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.department) {
      alert("Please select a department");
      return;
    }

    console.log('Login with:', formData);
    await login(formData, navigate);
  };

  return (
    <div className="bg-gray-850 text-white h-screen w-full flex flex-col justify-center items-center">
      <div className="h-[70vh] w-[70vh] bg-gray-950 rounded-xl shadow-lg shadow-violet-900 p-10 absolute">
        <form onSubmit={handleSubmit}>
          {/* User ID Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">User Id</label>
            <input
              type="text"
              name="userId"
              className="mt-1 w-full rounded-2xl border border-gray-500 p-2 focus:outline-none focus:ring"
              placeholder="Enter your User ID"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full rounded-2xl border border-gray-500 p-2 focus:outline-none focus:ring"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {/* Department Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Department</label>
            <select
              name="department"
              className="mt-1 w-full rounded-2xl border border-gray-500 p-2 focus:outline-none focus:ring bg-gray-900 text-white"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            >
              <option value="" disabled>Select Department</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Road">Road</option>
              <option value="Sanitization">Sanitization</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-violet-700 rounded-2xl px-4 py-2 text-white font-bold hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 flex items-center justify-center"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
