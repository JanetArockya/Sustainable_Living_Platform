import { createSlice } from '@reduxjs/toolkit';

interface CarbonState {
  footprint: number;
  monthlyData: Array<{ month: string; value: number }>;
  categories: {
    transportation: number;
    energy: number;
    food: number;
    waste: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: CarbonState = {
  footprint: 0,
  monthlyData: [],
  categories: {
    transportation: 0,
    energy: 0,
    food: 0,
    waste: 0,
  },
  isLoading: false,
  error: null,
};

const carbonSlice = createSlice({
  name: 'carbon',
  initialState,
  reducers: {
    updateFootprint: (state, action) => {
      state.footprint = action.payload;
    },
    addMonthlyData: (state, action) => {
      state.monthlyData.push(action.payload);
    },
  },
});

export const { updateFootprint, addMonthlyData } = carbonSlice.actions;
export default carbonSlice.reducer;
