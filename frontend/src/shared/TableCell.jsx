import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { AddIconButton } from "./components";

export const ButtonCell = ({ icon, name, onClick }) => {
  return (
    <TableCell align="right">
      <IconButton aria-label={name} onClick={onClick} children={icon} />
    </TableCell>
  );
};

export const SaveButtonCell = ({ onClick }) => {
  return <ButtonCell icon={<SaveIcon />} name="Save" onClick={onClick} />;
};
export const DeleteButtonCell = ({ onClick }) => {
  return <ButtonCell icon={<DeleteIcon />} name="Delete" onClick={onClick} />;
};
export const CancelButtonCell = ({ onClick }) => {
  return <ButtonCell icon={<CancelIcon />} name="Cancel" onClick={onClick} />;
};

export const EditableTableCell = (props) => {
  const { id, name, value, error, onChange } = props;

  return (
    <TableCell>
      <TextField
        error={error}
        key={id}
        label={name}
        defaultValue={value}
        fullWidth
        variant="standard"
        autoFocus
        margin="dense"
        onChange={(event) => onChange(event.target.value)}
      />
    </TableCell>
  );
};
