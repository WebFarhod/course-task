import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "../../types/course";
import { IStudent } from "../../types/student";

type ModalType = "add" | "edit" | "info" | undefined;
type ModalCourse = {
  type: ModalType;
  course?: ICourse;
};
type ModalStudent = {
  type: ModalType;
  student?: IStudent;
};
type ModalEnroll = {
  type: ModalType;
  student?: IStudent;
};

export interface ModalState {
  courseModal: ModalCourse;
  studentModal: ModalStudent;
  enrollModal: ModalEnroll;
}

export const initialState: ModalState = {
  courseModal: {
    type: undefined,
    course: undefined,
  },
  studentModal: {
    type: undefined,
    student: undefined,
  },
  enrollModal: {
    type: undefined,
    student: undefined,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCourseModal(state, action: PayloadAction<ModalCourse>) {
      state.courseModal = action.payload;
    },
    closeCourseModal(state) {
      state.courseModal = initialState.courseModal;
    },
    setStudentModal(state, action: PayloadAction<ModalStudent>) {
      state.studentModal = action.payload;
    },
    closeStudentModal(state) {
      state.studentModal = initialState.studentModal;
    },
    setEnrollModal(state, action: PayloadAction<ModalEnroll>) {
      state.enrollModal = action.payload;
    },
    closeEnrollModal(state) {
      state.enrollModal = initialState.enrollModal;
    },
  },
});

export const {
  setCourseModal,
  closeCourseModal,
  setStudentModal,
  closeStudentModal,
  setEnrollModal,
  closeEnrollModal,
} = modalSlice.actions;
export default modalSlice.reducer;
