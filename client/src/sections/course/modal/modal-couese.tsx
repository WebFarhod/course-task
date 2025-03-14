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
import { closeCourseModal } from "../../../store/slices/modalSlice";
import { IAddCourse, IEditCourse } from "../../../types/course";
import { addCourse, updateCourse } from "../../../store/actions/courseAction";
import Iconify from "../../../components/iconify";

const ModalCourse = () => {
  const dispatch = useAppDispatch();
  const { courseModal } = useSelector((state: RootState) => state.modal);
  const { course } = courseModal || {};

  interface IForm {
    title: string;
    image: string | undefined;
    price: number;
    isActive: boolean;
  }

  const defaultFormValues = {
    title: "",
    image: "",
    price: 0,
    isActive: false,
  };

  const [formValues, setFormValues] = useState<IForm>(defaultFormValues);

  useEffect(() => {
    setFormValues(
      course
        ? {
            title: course.title,
            image: course.image,
            price: course.price || 0,
            isActive: course.isActive,
          }
        : defaultFormValues
    );
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClose = useCallback(() => {
    setFormValues(defaultFormValues);
    dispatch(closeCourseModal());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formJson = {
        ...formValues,
        courseId: course?._id,
        price: Number(formValues.price),
      };

      if (courseModal.type === "edit") {
        dispatch(updateCourse(formJson as IEditCourse));
      } else {
        dispatch(addCourse(formJson as IAddCourse));
      }

      handleClose();
    },
    [formValues, course, courseModal, dispatch, handleClose]
  );

  return (
    <Dialog
      open={!!courseModal.type}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {courseModal.type === "edit" ? "Kursni Tahrirlash" : "Kurs Qo'shish"}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={formValues.image}
          onChange={handleChange}
          autoFocus
          required
          margin="dense"
          id="image"
          name="image"
          label="Kurs rasmi"
          fullWidth
        />
        <TextField
          value={formValues.title}
          onChange={handleChange}
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Kurs nomi"
          fullWidth
        />
        <TextField
          value={formValues.price}
          onChange={handleChange}
          required
          margin="dense"
          id="price"
          name="price"
          label="Narx"
          type="number"
          fullWidth
        />
        {courseModal.type === "edit" && (
          <Stack direction="row" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
              }
              label="Kurs Faolligi"
            />
            <Iconify icon={formValues.isActive ? "mdi:show" : "mdi:hide"} />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Bekor qilish
        </Button>
        <Button type="submit">Saqlash</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCourse;
