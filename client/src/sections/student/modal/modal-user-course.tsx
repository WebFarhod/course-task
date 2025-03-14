/* eslint-disable react-hooks/exhaustive-deps */
import type { SwitchProps } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  List,
  styled,
  Button,
  Dialog,
  Switch,
  ListItem,
  Typography,
  DialogTitle,
  ListItemText,
  DialogActions,
  DialogContent,
  ListItemAvatar,
} from "@mui/material";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { RootState } from "../../../store";
import { fCurrency } from "../../../utils/format-number";
import {
  createEnroll,
  getUnenrollCourses,
} from "../../../store/actions/studentActions";
import { closeEnrollModal } from "../../../store/slices/modalSlice";
import { ICreateEnroll } from "../../../types/enroll";

const courseImage =
  "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp";

export default function ModalEnrollCourses() {
  const dispatch = useAppDispatch();
  const { unenrollCourses } = useSelector((state: RootState) => state.student);
  const { enrollModal } = useSelector((state: RootState) => state.modal);
  const [checkedCourses, setCheckedCourses] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (enrollModal.student?._id) {
      dispatch(getUnenrollCourses(enrollModal.student?._id));
    } else {
      handleClose();
    }
  }, [dispatch, enrollModal.student]);

  const handleClose = () => {
    setCheckedCourses({});
    dispatch(closeEnrollModal());
  };

  const handleChangePaid =
    (courseId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        if (enrollModal.student?._id) {
          const data: ICreateEnroll = {
            studentId: enrollModal.student._id,
            courseId: courseId,
          };
          dispatch(createEnroll(data));
        }
      }
    };

  return (
    <Dialog open={!!enrollModal.type} fullWidth>
      <DialogTitle>Enroll</DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {unenrollCourses?.map((course) => (
            <ListItem disableGutters key={course._id}>
              {/* <ListItemButton
              onClick={() => handleListItemClick(course._id)}
            > */}
              <ListItemAvatar>
                <Box
                  component="img"
                  alt={course.title}
                  src={course.image ? course.image : courseImage}
                  sx={{
                    top: 0,
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" noWrap>
                    {course.title}
                  </Typography>
                }
                secondary={
                  <Typography component="span" variant="body2">
                    {fCurrency(course.price)}
                  </Typography>
                }
              />
              <IOSSwitch
                checked={checkedCourses[course._id] || false}
                onChange={handleChangePaid(course._id)}
                sx={{ m: 1 }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    // transitionDuration: '300ms',
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#4caf50",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));
