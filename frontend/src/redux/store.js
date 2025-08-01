import { configureStore } from "@reduxjs/toolkit";      
import authslice from "./authslice";
import jobSlice from "./jobslice"

const store = configureStore({
    reducer:{
        auth : authslice,
        Job: jobSlice
    }
});

export default store;