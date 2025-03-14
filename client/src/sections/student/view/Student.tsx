import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Box } from "@mui/system";
import Iconify from "../../../components/iconify";
import { RootState } from "../../../store";
import UserTableHead from "./user-table-head";
import { IStudent } from "../../../types/student";
import UserTableRow from "./user-table-row";
import { setStudentModal } from "../../../store/slices/modalSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Student = () => {
  const dispatch = useAppDispatch();

  const { students } = useTypedSelector((state) => state.student);

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Students
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => {
            dispatch(setStudentModal({ type: "add", student: undefined }));
          }}
        >
          Add
        </Button>
      </Box>
      <Container>
        <Card>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table>
              <UserTableHead
                headLabel={[
                  { id: "firstname", label: "firstname" },
                  { id: "lastname", label: "lastname" },
                  { id: "phone", label: "phone" },
                  { id: "isActive", label: "isActive" },
                  { id: "action", label: "" },
                ]}
              />
              <TableBody>
                {students?.map((row: IStudent) => (
                  <UserTableRow key={row._id} data={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

export default Student;
