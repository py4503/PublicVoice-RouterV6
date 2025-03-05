import { useState } from "react";
import { ChevronRight, HelpCircle, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { setFilter,clearFilters } from "../feature/complaintSlice";
import { useDispatch } from "react-redux";
// import { set } from "mongoose";

export default function Sidebar() {
    const isFilterVisible = useSelector((state) => state.filter.isFilterVisible)
    const dispatch = useDispatch();
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [selectedUrgency, setSelectedUrgency] = useState('');

    const handleLocationChange = (e) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        console.log(newLocation);
        dispatch(setFilter({ location: newLocation }));
    }

    const handleUrgencyChange = (urgency) => {
        console.log(urgency);
        setSelectedUrgency(urgency);
        dispatch(setFilter({ urgency }));
    }

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        dispatch(setFilter({ date: newDate }));
        console.log(newDate);
    }

    const handleClearFilters = () => {
        // console.log(e.target.value);
        dispatch(clearFilters());
        setDate('');
        setLocation('');
        setSelectedUrgency('')
    }

    const handleApplyFilters = () => {
        const filters = {
            location,
            urgency: selectedUrgency,
            date,
        };
        console.log("Applied Filters:", filters);
        dispatch(setFilter(filters));  // Dispatch filters to Redux store
    };

    return (  
        <div
            className={`flex top-0 right-0 ${isFilterVisible ? "w-64" : "w-0"} bg-black/40 backdrop-blur-sm border-r=l-2 border-white/20 text-white h-screen transition-all z-20 duration-300 absolute`}
        >
            {/* Toggle Button */}
            {/* <button
                className={`absolute top-5 -right-0 p-1 rounded-full shadow-md bg-white/10 transition-transform duration-300 ${
                    isFilterVisible ? "" : "rotate-180"
                }`}
            >
                <ChevronRight className="text-white" />
            </button> */}

            <div className={`p-4 space-y-6 transition-opacity duration-300 ${isFilterVisible ? "opacity-100" : "opacity-0"}`}>
                <h2 className="text-lg font-semibold">Search Filters</h2>

                <div className="space-y-4">
                    {/* Location Filter */}
                    <div>
                        <label className="text-sm">Locations:</label>
                        <select className="w-full bg-neutral-800/80 text-white p-2 rounded-md mt-1"
                        onChange={handleLocationChange}
                        defaultValue=""
                        >   <option value="" disabled>Select Location</option>
                            <option>Madhya Pradesh</option>
                            <option>Delhi</option>
                            <option>Mumbai</option>
                        </select>
                    </div>

                    {/* Urgency Filter */}
                    <div>
                        <label className="text-sm">Urgency:</label>
                        <div className="space-y-2 mt-1">
                            <button className={`w-full bg-opacity text-white p-2 rounded-md hover:bg-gray-700 duration-500 transition-colors ${selectedUrgency === 'High' ? 'bg-gradient-to-r from-blue-700 to-blue-400/40' : 'bg-neutral-800/80'}`}
                            onClick={() => handleUrgencyChange('High')}
                            >
                                High
                            </button>
                            
                            <button className={`w-full bg-opacity text-white p-2 rounded-md hover:bg-gray-700 duration-500 transition-colors ${selectedUrgency === 'Medium' ? 'bg-gradient-to-r from-blue-700 to-blue-400/40' : 'bg-neutral-800/80'}`}
                            onClick={() => handleUrgencyChange('Medium')}
                            >
                                Medium
                            </button>

                            <button className={`w-full  text-white p-2 rounded-md hover:bg-gray-700 transition-colors duration-500 ${selectedUrgency === 'Low' ? 'bg-gradient-to-r from-blue-700 to-blue-400/40' : 'bg-neutral-800/80'}`}
                            onClick={() => handleUrgencyChange('Low')}
                            >
                                Low
                            </button>
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <label className="text-sm">Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            className="w-full bg-neutral-800/80 text-white p-2 rounded-md mt-1 hover:bg-gray-700 transition-colors"
                        />
                    </div>
                </div>
                {/* Apply filters */}

                <button
                    onClick={handleApplyFilters}
                    className="w-full bg-gradient-to-r from-blue-600/50 to-blue-400/50 text-white p-2 rounded-md mt-2 hover:from-blue-700 hover:to-blue-500 transition-all shadow-md"
                >
                    Apply Filters
                </button>

                {/* clear filters */}
                <button
                    onClick={handleClearFilters}
                    className="w-full bg-red-500/30 text-white p-2 rounded-md mt-4 hover:bg-red-600 transition-colors"
                >
                    Clear Filters
                </button>
                {/* Footer */}
                <div className="absolute bottom-4 left-4">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-2">
                        <HelpCircle size={18} />
                        <span>Help</span>
                    </button>
                    <button className="flex items-center space-x-2 text-red-400 hover:text-red-600 transition-colors">
                        <LogOut size={18} />
                        <span>Logout Account</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
