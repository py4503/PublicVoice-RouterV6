import React, { useEffect, useState } from 'react';
import GrievanceCard from '../components/GrievanceCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SearchFilter';
import { useAuthStore } from '../store/useAuthStore'; // ✅ Import useAuthStore

const HomePage = () => {
  const { user, department } = useAuthStore(); // ✅ Get logged-in user
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
  console.log("Logged-in user:", user); // Debugging log
  

  const fetchComplaints = async () => {
    try {
      console.log(`Fetching complaints for department: ${department}`); // Debugging log
      const response = await fetch(`/api/complaints?category=${department}`);
      if (!response.ok) throw new Error('Failed to fetch complaints');

      const data = await response.json();
      console.log("Fetched complaints:", data); // Debugging log
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  fetchComplaints();
}, [user]);


  return (
    <div className="relative z-10">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <GrievanceCard complaints={complaints} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

