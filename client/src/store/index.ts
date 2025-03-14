import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import courseReducer from "./slices/courseSlice";
import authReducer from "./slices/authSlice";
import snackbarReducer from "./slices/snackbar";
import studentReducer from "./slices/studentSlice";
import dashboardReducer from "./slices/dashboardSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    auth: authReducer,
    snackbars: snackbarReducer,
    student: studentReducer,
    dashboard: dashboardReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
