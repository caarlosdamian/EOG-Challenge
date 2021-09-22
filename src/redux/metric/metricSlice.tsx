import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInterface {
  globalMetric: string[];
  globalMetricsSelected: string[];
}

const initialState: UserInterface = {
  globalMetric: [''],
  globalMetricsSelected: [],
};

export const metricslice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    setMetric(state, action: PayloadAction<string[]>) {
      state.globalMetric = action.payload;
    },
    setUpdate: (state, action: PayloadAction<string[]>) => {
      state.globalMetricsSelected = action.payload;
    },
  },
});

export const { setMetric, setUpdate } = metricslice.actions;

export default metricslice.reducer;
