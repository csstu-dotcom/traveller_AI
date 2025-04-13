// redux toolkit

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import formReducer from './formSlice'; // Import the formSlice reducer



export const store = configureStore({
    reducer: {
      
        user : userReducer,
        form: formReducer, // Add the formSlice reducer here
      
    },
    });

export default store;
