import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../types/course";

export interface CourseState {
  courses: ICourse[];
  isLoading: boolean;
}

const initialState: CourseState = {
  courses: [],
  isLoading: false,
};

const courseSlice = createSlice({
  name: "course",
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
    setCourses(state, action: PayloadAction<ICourse[]>) {
      state.isLoading = false;
      state.courses = action.payload;
    },
  },
});

export const { start, success, setCourses, failure } = courseSlice.actions;
export default courseSlice.reducer;
