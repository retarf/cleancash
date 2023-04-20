
import React, { useState, useEffect, useRef } from 'react';
import Title from '../Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useParams, Outlet } from 'react-router-dom';


function cleaningList(props) {

    const newCleaningDate = useRef();
    const newCleaningChild = useRef();
    const newCleaningFields = useRef();
    const [editOnState, setEditOnState] = useState(false);

    const toggleEditOnStateHandler = () => {
        setEditOnState(true);
    };

    const addCleaning = () => {
        console.log("TEST");
        console.log({"date": newCleaningDate.current.value, "child": newCleaningChild.current.value, "Fields": newCleaningFields.current.value.split(",")});
        props.onAddCleaning(
            newCleaningDate.current.value,
            newCleaningChild.current.value,
            newCleaningFields.current.value.split(",")
        );
        setEditOnState(false);
    };

    return <React.Fragment>
              <Grid item xs={12}>

                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Children List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Child</TableCell>
            <TableCell>Fields</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cleaningsState.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.child}</TableCell>
              <TableCell>{row.field}</TableCell>
            </TableRow>
          ))}
          {editOnState ? <Grid item xs={12}>
                <TextField id="date" label="Date" variant="outlined" inputRef={newCleaningDate}/>
                <TextField id="child" label="Child" variant="outlined" inputRef={newCleaningChild}/>
                <TextField id="fields" label="Fields" variant="outlined" inputRef={newCleaningFields}/>
                <Button onClick={addCleaning}>save</Button>
            </Grid> : null }
        </TableBody>
      </Table>
                </Paper>
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" onClick={toggleEditOnStateHandler}>Add</Button>
              </Grid>
              <Grid item xs={12}>
              <Button variant="outlined">Delete</Button>
              </Grid>
    </React.Fragment>
};

export default cleaningList;