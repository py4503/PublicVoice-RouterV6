import { FaSearch } from "react-icons/fa";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {filteredComplaint} from "../feature/complaintSlice"
import { toggleFilter } from "../feature/filterSlice";

export default function Navbar() {
    
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        dispatch(filteredComplaint(e.target.value));
    }
    
    const handleSearch = (e) => {
        if (searchQuery.trim() !== "") {
            console.log("Searching for:", searchQuery);
          }
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      };

    const toggleFilterVisibility = () =>{
        dispatch(toggleFilter());
    }
  return (
    
    <nav className="flex items-center justify-between px-8 py-2 bg-black/10 border-t-2 border-b-2 border-white/20 shadow-md">
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="text-violet-700 font-bold text-lg">Drishti</div>
        
        {/* Navigation Links */}
        <div className="flex justify-start space-x-6 text-gray-300">
          <a href="#" className="hover:text-gray-500">Home</a>
          <a href="#" className="hover:text-gray-500">About Us</a>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100/40 px-4 py-2 rounded-full w-96">
        <FaSearch className="text-white/50 mr-2" />
        <input
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          on
          className="bg-transparent focus:outline-none text-white/90 flex-1"
        />
        <SlidersHorizontal className="text-neutral-900 cursor-pointer" onClick={toggleFilterVisibility}/>
      </div>
      
      <button className="bg-violet-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-400">
        Login
      </button>
    </nav>
  );
}
