import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ICourse } from "../../../../types/course";
import { fCurrency } from "../../../../utils/format-number";
import ActionCourseEnroll from "../../action/action-enroll-course";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../../../store";

const courseImage =
  "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function CourseItem({ course }: { course: ICourse }) {
  const { student } = useTypedSelector((state) => state.student);

  const renderImg = (
    <Box
      component="img"
      alt={course.title}
      src={course.image ? course.image : courseImage}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">{fCurrency(course.price)}</Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>{renderImg}</Box>
      <Stack spacing={2} sx={{ p: 2, px: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2" noWrap>
            {course.title}
          </Typography>
          <ActionCourseEnroll course={course} student={student} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {renderPrice}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
