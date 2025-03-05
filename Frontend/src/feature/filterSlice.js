import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFilterVisible : false
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleFilter: (state) => {
            state.isFilterVisible = !state.isFilterVisible;
        }
    }
})

export const {toggleFilter} = filterSlice.actions;

export default filterSlice.reducer;