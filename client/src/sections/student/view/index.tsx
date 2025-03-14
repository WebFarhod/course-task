import { useEffect } from "react";

import { getStudents } from "../../../store/actions/studentActions";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import ModalStudent from "../modal/modal-student";
import Student from "./Student";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../../store";
import EnrollCourse from "./enroll-course";
import ModalEnrollCourses from "../modal/modal-user-course";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function StudentView() {
  const dispatch = useAppDispatch();
  const { student } = useTypedSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);
  return (
    <>
      {student ? <EnrollCourse /> : <Student />}

      <ModalStudent />
      <ModalEnrollCourses />
    </>
  );
}
