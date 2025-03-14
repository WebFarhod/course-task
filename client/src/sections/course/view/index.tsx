import type { TypedUseSelectorHook } from "react-redux";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { getCourses } from "../../../store/actions/courseAction";
import Iconify from "../../../components/iconify";
import { setCourseModal } from "../../../store/slices/modalSlice";
import { CourseItem } from "./course-item";
import ModalCourse from "../modal/modal-couese";
import Grid from "@mui/material/Grid";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function CourseView() {
  const dispatch = useAppDispatch();
  const { courses } = useTypedSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Kurslar
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => {
            dispatch(setCourseModal({ type: "add", course: undefined }));
          }}
        >
          Add
        </Button>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={3}>
            <CourseItem course={course} />
          </Grid>
        ))}
      </Grid>
      <ModalCourse />
    </>
  );
}
