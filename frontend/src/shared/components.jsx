import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CircularProgress from "@mui/material/CircularProgress";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

export function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export const EditableTitle = ({ defaultValue, defaultState, setTitle }) => {
  const [editState, setEditState] = useState(defaultState);

  const enableEditState = (event) => {
    setEditState(true);
  };

  const disableEditState = (event) => {
      setTitle(event.target.value);
      setEditState(false);
  };

  return (
    <Stack direction="row" spacing={1}>
      {editState ? (
        <TextField defaultValue={defaultValue} onBlur={disableEditState} />
      ) : (
        <h1 onClick={enableEditState}>{defaultValue}</h1>
      )}
      <IconButton aria-label="edit" onClick={enableEditState}>
        <ModeEditIcon />
      </IconButton>
    </Stack>
  );
};

export const getDateString = (newDate) => newDate.toISOString().split("T")[0];

export const ErrorBox = ({ msg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        color: "red",
        fontWeight: "bold",
      }}
    >
      <DangerousIcon />
      <span>Error: {msg}</span>
    </Box>
  );
};

export const Spinner = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export const CustomTableHead = ({ columns }) => {
  return (
    <TableHead>
      <TableRow key="header">
        {columns.map((column, idx) => (
          <TableCell key={idx}>{column}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const SelectMenu = ({
  label,
  itemList,
  item,
  onChangeHandler,
  fieldName,
}) => {
  const menuLabel = `${label}-simple-select-label`;
  const id = `${label}-simple-select`;

  return (
    <FormControl fullWidth>
      <InputLabel id={menuLabel}>{label}</InputLabel>
      <Select
        labelId={menuLabel}
        id={id}
        value={item ? item : ""}
        label={label}
        onChange={onChangeHandler}
      >
        <MenuItem key="" value=""></MenuItem>
        {itemList.map((item) => {
          return (
            <MenuItem key={item.id} value={item}>
              {item[fieldName]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export const TextButtonTableCell = ({ text, onClick, disabled = false }) => {
  return (
    <TableCell>
      <Button onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </TableCell>
  );
};

export const AddIconButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="add">
      <AddIcon />
    </IconButton>
  );
};
