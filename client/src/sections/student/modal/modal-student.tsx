/* eslint-disable react-hooks/exhaustive-deps */
import type { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";

import {
  Stack,
  Button,
  Dialog,
  Checkbox,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from "@mui/material";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { closeStudentModal } from "../../../store/slices/modalSlice";
import { IAddStudent, IEditStudent } from "../../../types/student";
import Iconify from "../../../components/iconify";
import {
  addStudent,
  updateStudent,
} from "../../../store/actions/studentActions";

const ModalStudent = () => {
  const dispatch = useAppDispatch();
  const { studentModal } = useSelector((state: RootState) => state.modal);
  const { student } = studentModal || {};

  interface IForm {
    firstname: string;
    lastname: string;
    phone: string;
    isActive: boolean;
  }

  const defaultFormValues = {
    firstname: "",
    lastname: "",
    phone: "",
    isActive: false,
  };

  const [formValues, setFormValues] = useState<IForm>(defaultFormValues);

  useEffect(() => {
    setFormValues(
      student
        ? {
            firstname: student.firstname,
            lastname: student.lastname,
            phone: student.phone,
            isActive: student.isActive,
          }
        : defaultFormValues
    );
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClose = useCallback(() => {
    setFormValues(defaultFormValues);
    dispatch(closeStudentModal());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formJson = {
        ...formValues,
        studentId: student?._id,
      };

      if (studentModal.type === "edit") {
        dispatch(updateStudent(formJson as IEditStudent));
      } else {
        dispatch(addStudent(formJson as IAddStudent));
      }

      handleClose();
    },
    [formValues, student, studentModal, dispatch, handleClose]
  );

  return (
    <Dialog
      open={!!studentModal.type}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>{studentModal.type === "edit" ? "Edit" : "Add"}</DialogTitle>
      <DialogContent>
        <TextField
          value={formValues.firstname}
          onChange={handleChange}
          autoFocus
          required
          margin="dense"
          id="firstname"
          name="firstname"
          label="Firstname"
          fullWidth
        />
        <TextField
          value={formValues.lastname}
          onChange={handleChange}
          required
          margin="dense"
          id="lastname"
          name="lastname"
          label="Lastname"
          fullWidth
        />
        <TextField
          value={formValues.phone}
          onChange={handleChange}
          required
          margin="dense"
          id="phone"
          name="phone"
          label="Phone"
          type=""
          fullWidth
        />
        {studentModal.type === "edit" && (
          <Stack direction="row" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
              }
              label="is active"
            />
            <Iconify icon={formValues.isActive ? "mdi:show" : "mdi:hide"} />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalStudent;
