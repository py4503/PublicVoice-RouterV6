import {configureStore} from '@reduxjs/toolkit'
import complaintReducer from '../feature/complaintSlice'
import filterReducer from '../feature/filterSlice'

export const store = configureStore({
    reducer: {
        complaint: complaintReducer,
        filter: filterReducer
    }
})
export default store