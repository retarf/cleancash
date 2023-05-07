import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Title(props) {
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


export default Title;
