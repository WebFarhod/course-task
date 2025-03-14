// import type { IStudent } from "src/types/student";

import { useState, useCallback } from "react";

import { IconButton } from "@mui/material";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { IStudent } from "../../../types/student";
import Iconify from "../../../components/iconify";
import { setStudentModal } from "../../../store/slices/modalSlice";
import { deleteStudent } from "../../../store/actions/studentActions";

export default function ActionStudent({ student }: { student: IStudent }) {
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
              dispatch(setStudentModal({ type: "edit", student }));
              handleClosePopover();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Tahrirlash
          </MenuItem>

          <MenuItem
            onClick={() => {
              dispatch(deleteStudent(student._id));
              handleClosePopover();
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Oʻchirish
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
