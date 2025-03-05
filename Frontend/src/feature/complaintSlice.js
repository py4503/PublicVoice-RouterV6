import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    complaints: [],
    filteredComplaints: [],
    status: 'idle',
    error: null,
    filters:{
        location: '',
        urgency:'',
        date: '',
    }
}

// Async thunk to fetch complaints from the database
export const fetchComplaints = createAsyncThunk('complaint/fetchComplaints', async () => {
    const response = await axios.get('/api/complaints'); // Adjust the URL to your API endpoint
    return response.data;
});

export const complaintSlice = createSlice({
    name: 'complaint',
    initialState,
    reducers: {
        removeComplaint: (state, action) => {
            state.complaints = state.complaints.filter((complaint) => complaint.id !== action.payload)
        },
        filteredComplaint:(state, action) => {
            const query = action.payload.toLowerCase();
            state.filteredComplaints = state.complaints.filter((complaint) =>
                complaint.title.toLowerCase().includes(query) || complaint.description.toLowerCase().includes(query) 
       )       },

       setFilter: (state, action) => {
        state.filters = { ...state.filters, ...action.payload };
        state.filteredComplaints = state.complaints.filter((complaint) => {
            const { location, urgency, date } = state.filters;

            const matchesLocation = location ? complaint.location === location : true;
            const matchesUrgency = urgency ? complaint.urgency === urgency : true;
            const matchesDate = date ? complaint.date === date : true;

            return matchesLocation && matchesUrgency && matchesDate;
        });
        },

        clearFilters: (state) => {
            state.filters = { location: '', urgency: '', date: '' };
            state.filteredComplaints = state.complaints;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComplaints.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComplaints.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.complaints = action.payload;
                state.filteredComplaints = action.payload;
            })
            .addCase(fetchComplaints.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { removeComplaint,setFilter,clearFilters, filteredComplaint } = complaintSlice.actions;

export default complaintSlice.reducer;