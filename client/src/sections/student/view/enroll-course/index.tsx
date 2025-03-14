import { Box, Button, Grid, Typography } from "@mui/material";
import { CourseItem } from "./course-item";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useEffect } from "react";
import {
  getCompletedCourses,
  getEnrollCourses,
  setStudent,
} from "../../../../store/actions/studentActions";
import Iconify from "../../../../components/iconify";
import { setEnrollModal } from "../../../../store/slices/modalSlice";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const EnrollCourse = () => {
  const dispatch = useAppDispatch();
  const { student, courses, completedCourses } = useTypedSelector(
    (state) => state.student
  );

  useEffect(() => {
    if (student?._id) {
      dispatch(getEnrollCourses(student._id));
      dispatch(getCompletedCourses(student._id));
    }
  }, [student, dispatch]);

  if (courses.length === 0) {
    return (
      <>
        {" "}
        <Box
          display="flex"
          alignItems="center"
          mb={5}
          justifyContent="space-between"
        >
          <Button
            color="inherit"
            startIcon={<Iconify icon="weui:back-filled" />}
            onClick={() => {
              dispatch(setStudent(null));
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => {
              dispatch(
                setEnrollModal({ type: "add", student: student || undefined })
              );
            }}
          >
            Enroll course
          </Button>
        </Box>
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="textSecondary">
            No Data Available
          </Typography>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        mb={5}
        justifyContent="space-between"
      >
        <Button
          color="inherit"
          startIcon={<Iconify icon="weui:back-filled" />}
          onClick={() => {
            dispatch(setStudent(null));
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => {
            dispatch(
              setEnrollModal({ type: "add", student: student || undefined })
            );
          }}
        >
          Add
        </Button>
      </Box>
      <Typography variant="h4">Enrolled Courses</Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={3}>
            <CourseItem course={course} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" mt={5}>
        Completed Courses
      </Typography>
      <Grid container spacing={3}>
        {completedCourses.map((course) => (
          <Grid item xs={12} sm={6} md={3}>
            <CourseItem course={course} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default EnrollCourse;
