import Avatar from "@mui/material/Avatar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Chip } from "@mui/material";
import { IStudent } from "../../../types/student";
import ActionStudent from "../action/action-student";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setStudent } from "../../../store/actions/studentActions";

interface IProps {
  data: IStudent;
}

export default function UserTableRow({ data }: IProps) {
  const dispatch = useAppDispatch();

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ cursor: "pointer" }}>
        <TableCell
          sx={{ display: { xs: "none", md: "table-cell" } }}
          onClick={() => {
            dispatch(setStudent(data));
          }}
        >
          {<Avatar alt={data.firstname} src={undefined} />}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          onClick={() => {
            dispatch(setStudent(data));
          }}
        >
          {data.firstname}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          onClick={() => {
            dispatch(setStudent(data));
          }}
        >
          {data.lastname}
        </TableCell>
        <TableCell
          sx={{ display: { xs: "none", sm: "table-cell" } }}
          onClick={() => {
            dispatch(setStudent(data));
          }}
        >
          {data.phone}
        </TableCell>
        <TableCell
          onClick={() => {
            dispatch(setStudent(data));
          }}
        >
          {data.isActive ? (
            <Chip label="Active" color="success" size="small" />
          ) : (
            <Chip label="Not Active" color="error" size="small" />
          )}
        </TableCell>

        <TableCell align="right">
          <ActionStudent student={data} />
        </TableCell>
      </TableRow>
    </>
  );
}
