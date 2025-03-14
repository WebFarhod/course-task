import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudent } from "../../types/student";
import { ICourse } from "../../types/course";

interface AuthState {
  students: IStudent[];
  student: IStudent | null;
  courses: ICourse[];
  unenrollCourses: ICourse[];
  completedCourses: ICourse[];
  isLoading: boolean;
}

const initialState: AuthState = {
  students: [],
  courses: [],
  completedCourses: [],
  unenrollCourses: [],
  student: null,
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
    setStudents(state, action: PayloadAction<IStudent[]>) {
      state.students = action.payload;
    },
    setStudentData(state, action: PayloadAction<IStudent | null>) {
      state.isLoading = false;
      state.student = action.payload;
    },
    setCourses(state, action: PayloadAction<ICourse[]>) {
      state.isLoading = false;
      state.courses = action.payload;
    },
    setUnenrollCourses(state, action: PayloadAction<ICourse[]>) {
      state.isLoading = false;
      state.unenrollCourses = action.payload;
    },
    setCompletedCourses(state, action: PayloadAction<ICourse[]>) {
      state.isLoading = false;
      state.completedCourses = action.payload;
    },
  },
});

export const {
  start,
  success,
  setStudents,
  setStudentData,
  setCourses,
  failure,
  setUnenrollCourses,
  setCompletedCourses,
} = authSlice.actions;
export default authSlice.reducer;
