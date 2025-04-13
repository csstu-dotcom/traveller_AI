import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destination: '',
  days: 0,
  people: 0,
  budget: 0,
  coordinates: {
    lat: null,
    lng: null,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { saveFormData } = formSlice.actions;
export default formSlice.reducer;
