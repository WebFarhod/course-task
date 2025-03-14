/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  analyticsData: any;
  isLoading: boolean;
}

const initialState: DashboardState = {
  analyticsData: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    start(state) {
      state.isLoading = true;
    },
    success(state) {
      state.isLoading = false;
    },
    failure(state) {
      state.isLoading = false;
    },
    setDashboard(state, action: PayloadAction<any>) {
      state.analyticsData = action.payload;
    },
  },
});

export const { start, success, setDashboard, failure } = authSlice.actions;
export default authSlice.reducer;
