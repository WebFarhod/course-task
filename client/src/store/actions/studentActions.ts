/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddStudent, IEditStudent, IStudent } from "../../types/student";

import {
  start,
  success,
  failure,
  setStudents,
  setStudentData,
  setCourses,
  setUnenrollCourses,
  setCompletedCourses,
} from "../slices/studentSlice";

import { AppThunk } from "../index";
import $api from "../../service/auth";
import { ICreateEnroll } from "../../types/enroll";

export const getStudents = (): AppThunk => async (dispatch) => {
  dispatch(start());
  try {
    const res = await $api.get("/student");

    const { data } = res;

    dispatch(setStudents(data));
  } catch (error: any) {
    dispatch(failure());
  }
};

export const addStudent =
  (data: IAddStudent): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.post("/student", data);
      dispatch(getStudents());
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const updateStudent =
  (data: IEditStudent): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.put(`/student/${data.studentId}`, data);
      dispatch(getStudents());
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const deleteStudent =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.delete(`/student/${id}`);
      dispatch(getStudents());
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };

/// //////////

export const setStudent =
  (data: IStudent | null): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      dispatch(setStudentData(data));
    } catch (error: any) {
      dispatch(failure());
    }
  };

/// /////////

export const createEnroll =
  (data: ICreateEnroll): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.post("/enroll", data);
      dispatch(getEnrollCourses(data.studentId));
      dispatch(getUnenrollCourses(data.studentId));
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const getEnrollCourses =
  (studentId: string): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      const res = await $api.get(`/enroll/by-student?studentId=${studentId}`);

      const { data } = res;

      dispatch(setCourses(data));
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const getUnenrollCourses =
  (studentId: string): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      const res = await $api.get(`/enroll/unenrolled?studentId=${studentId}`);

      const { data } = res;

      dispatch(setUnenrollCourses(data));
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const getCompletedCourses =
  (studentId: string): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      const res = await $api.get(`/enroll/completed?studentId=${studentId}`);

      const { data } = res;

      dispatch(setCompletedCourses(data));
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const deleteEnroll =
  (studentId: string, courseId: string): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.delete(`/enroll/${studentId}/${courseId}`);

      dispatch(getEnrollCourses(studentId));
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };

export const completionEnroll =
  (studentId: string, courseId: string): AppThunk =>
  async (dispatch) => {
    dispatch(start());
    try {
      await $api.put("/enroll/completed", { studentId, courseId });
      dispatch(getEnrollCourses(studentId));
      dispatch(getCompletedCourses(studentId));
      dispatch(success());
    } catch (error: any) {
      dispatch(failure());
    }
  };
