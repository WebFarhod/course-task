/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  start,
  success,
  failure,
  setDashboard,
} from "../slices/dashboardSlice";

import { AppThunk } from "../index";
import $api from "../../service/auth";

export const getDashboard = (): AppThunk => async (dispatch) => {
  dispatch(start());
  try {
    const res = await $api.get("/dashboard");

    const { data } = res;

    dispatch(setDashboard(data));
    dispatch(success());
  } catch (error: any) {
    dispatch(failure());
  }
};
