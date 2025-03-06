import React, { useEffect, useState } from "react";
import GrievanceCard from "../components/GrievanceCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SearchFilter";
import { useAuthStore } from "../store/useAuthStore"; // ✅ Import useAuthStore

const HomePage = () => {
  const { user } = useAuthStore(); // ✅ Get logged-in user
  const department = user?.department; // ✅ Ensure user exists before accessing department
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Add loading state


    useEffect(() => {
      console.log("Logged-in user:", user); // Debugging log
      console.log("User Department:", department); // ✅ Check department value
    
      const fetchComplaints = async () => {
        try {
          console.log(`Fetching complaints for department: ${department}`); // Debugging log
          const response = await fetch(`http://localhost:5001/api/complaints?category=${department}`);
          console.log('raw resp:',response);
          if (!response.ok) throw new Error('Failed to fetch complaints');
    
          const data = await response.json();
          console.log("Fetched complaints:", data); // Debugging log
          setComplaints(data);
        } catch (error) {
          console.log('Error fetching complaints:', error);
        }
      };
    
      // fetchComplaints();
    }, [user, department]); // ✅ Add department as dependency
    
// ✅ Now properly depends on department

  return (
    <div className="relative z-10">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading complaints...</p> // ✅ Show loading state
          ) : complaints.length > 0 ? (
            <GrievanceCard complaints={complaints} />
          ) : (
            <p className="text-center text-red-500">No complaints found for this department.</p> // ✅ Handle empty state
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
