import { createSlice } from '@reduxjs/toolkit';

export interface UserInterface {
  globalMetric: string;
}

const initialState: UserInterface = {
  globalMetric: '',
};

export const metricslice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    setMetric(state, action) {
      state.globalMetric = action.payload;
    },
  },
});

export const { setMetric } = metricslice.actions;

export default metricslice.reducer;
