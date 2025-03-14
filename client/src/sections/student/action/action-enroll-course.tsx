import { useState, useCallback } from "react";

import { IconButton } from "@mui/material";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { ICourse } from "../../../types/course";
import Iconify from "../../../components/iconify";
import { IStudent } from "../../../types/student";
import {
  completionEnroll,
  deleteEnroll,
} from "../../../store/actions/studentActions";

export default function ActionCourseEnroll({
  course,
  student,
}: {
  course: ICourse;
  student: IStudent | null;
}) {
  const dispatch = useAppDispatch();
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );
  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  return (
    <>
      <IconButton onClick={handleOpenPopover}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: "action.selected" },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              if (student) {
                dispatch(completionEnroll(student._id, course._id));
              }
              handleClosePopover();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Completion
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (student) {
                dispatch(deleteEnroll(student._id, course._id));
              }
              handleClosePopover();
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
