import { configureStore } from '@reduxjs/toolkit';
import MetricReducer from './metric/metricSlice';

export const Store = configureStore({
  reducer: { metric: MetricReducer },
});
