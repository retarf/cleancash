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
    if (event.code === "Enter") {
      setTitle(event.target.value);
      setEditState(false);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {editState ? (
        <TextField defaultValue={defaultValue} onKeyDown={disableEditState} />
      ) : (
        <h1 onClick={enableEditState}>{defaultValue}</h1>
      )}
      <IconButton aria-label="edit" onClick={enableEditState}>
        <ModeEditIcon />
      </IconButton>
    </Stack>
  );
};

export const EditableTableCell = ({ id, name, defaultValue, query }) => {
  const updateMutation = query.useUpdate(id);
  const [editState, setEditState] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const enableEditState = (event) => {
    setEditState(true);
  };

  const disableEditState = (event) => {
    const value = event.target.value;
    if (event.code === "Enter") {
      setValue(value);
      setEditState(false);
      save(value);
    }
  };

  const save = (value) => {
    let object = {};
    object.id = id;
    object[name] = value;

    updateMutation.mutate(object);
  };

  // TODO: Change id value to id
  return (
    <>
      {editState ? (
        <TableCell>
          <TextField
            id="value"
            label="value"
            variant="outlined"
            defaultValue={value}
            onKeyDown={disableEditState}
          />
        </TableCell>
      ) : (
        <TableCell onClick={enableEditState}>{value}</TableCell>
      )}
    </>
  );
};

export const DeleteCell = ({ id, query }) => {
  const deleteMutation = query.useDelete(id);

  const del = (event) => {
    event.stopPropagation();
    deleteMutation.mutate();
  };

  return (
    <TableCell align="right">
      <IconButton
        tabIndex={id}
        aria-label="delete"
        onClick={del}
        children={<DeleteIcon />}
      />
    </TableCell>
  );
};

export const getDateString = (newDate) => newDate.toISOString().split("T")[0];

export const ErrorBox = ({ msg: string }) => {
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
  let blankColumnId = 1;

  const getCurrentId = () => {
    let current = "column" + blankColumnId;
    blankColumnId++;
    return current;
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={!column && getCurrentId()}>{column}</TableCell>
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

export const TextButtonTableCell = ({ text, onClick, disabled: boolean = false }) => {
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

export const TableRowList = ({
  itemList,
  columns,
  query,
  editable = false,
  onClickHandler = () => null,
}) => {
  return (
    <>
      {itemList.map((item) => (
        <TableRow key={`row-${item.id}`}>
          {columns.map(
            (column) =>
              column && (
                <React.Fragment key={item.id}>
                  {editable ? (
                    <EditableTableCell
                      key={`cell-${item.id}-${column}`}
                      id={item.id}
                      name={item[column.toLowerCase()]}
                      defaultValue={item[column.toLowerCase()]}
                      query={query}
                    />
                  ) : (
                    <TableCell
                      key={`cell-${item.id}-${column}`}
                      onClick={() => onClickHandler(item.id)}
                    >
                      {item[column.toLowerCase()]}
                    </TableCell>
                  )}
                </React.Fragment>
              )
          )}
          <TableCell></TableCell>
          <DeleteCell id={item.id} query={query} />
        </TableRow>
      ))}
    </>
  );
};
