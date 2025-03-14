/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAddCourse, IEditCourse } from "../../types/course";

import { start, success, failure, setCourses } from "../slices/courseSlice";

import type { AppThunk } from "../index";
import $api from "../../service/auth";

export const getCourses = (): AppThunk => async (dispatch) => {
  dispatch(start());
  try {
    const res = await $api.get("/course");

    const { data } = res;

    dispatch(setCourses(data));
  } catch (error: any) {
    dispatch(failure());
  }
};

export const addCourse =
  (data: IAddCourse): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.post("/course", data);
      dispatch(getCourses());
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const updateCourse =
  (data: IEditCourse): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.put(`/course/${data.courseId}`, data);
      dispatch(getCourses());
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const deleteCourse =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.delete(`/course/${id}`);
      dispatch(getCourses());
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };
