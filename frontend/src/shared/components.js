import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TableCell from "@mui/material/TableCell";

import DeleteIcon from '@mui/icons-material/Delete';

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

    const [ editState, setEditState ] = useState(defaultState);

    const enableEditState = (event) => {
        setEditState(true);
    }

    const disableEditState = (event) => {
        if (event.code === "Enter") {
            setTitle(event.target.value);
            setEditState(false);
        }
    }

    return (
      <Stack direction="row" spacing={1}>
          { editState ? <TextField defaultValue={ defaultValue } onKeyDown={ disableEditState } /> : <h1 onClick={ enableEditState }>{ defaultValue }</h1> }
          <IconButton aria-label="edit" onClick={ enableEditState } >
              <ModeEditIcon />
          </IconButton>
      </Stack>
    )
}

export const EditableTableCell = ({ id, name, defaultValue, query }) => {
    const updateMutation = query.useUpdate(id);
    const [ editState, setEditState ] = useState(false);
    const [ value, setValue ] = useState(defaultValue);

    const enableEditState = (event) => {
        setEditState(true);
    }

    const disableEditState = (event) => {
        const value = event.target.value;
        if (event.code === "Enter") {
            setValue(value);
            setEditState(false);
            save(value);
        }
    }

    const save = (value) => {
        let object = {};
        object["id"] = id;
        object[name] = value;

        updateMutation.mutate(object);
    }

    return <>
     { editState ? (
         <TableCell>
             <TextField
               id="value"
               label="value"
               variant="outlined"
               defaultValue={ value }
               onKeyDown={ disableEditState }
             />
         </TableCell>
         ) : (
             <TableCell onClick={ enableEditState }>
               { value }
             </TableCell>
         )
      }
      </>
      }


export const DeleteCell = ({id, query}) => {
    const deleteMutation = query.useDelete(id);

    const del = () => {
        deleteMutation.mutate();
    }

    return <TableCell align="right">
             <IconButton tabIndex={ id } aria-label="delete" onClick={ del } children={ <DeleteIcon /> } />
           </TableCell>

}