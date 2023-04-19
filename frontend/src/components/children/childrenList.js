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


function ChildrenList(props) {

    const { id } = useParams;
    const newChildName = useRef("");
    const [editOnState, setEditOnState] = useState(false);

    const toggleEditOnStateHandler = () => {
        setEditOnState(true);
    };

    const addChild = () => {
        console.log("TEST");
        props.onAddChild(newChildName.current.value);
        setEditOnState(false);
    };

    return <React.Fragment>
              <Grid item xs={12}>

                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Children List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.childrenState.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
          {editOnState ? <Grid item xs={12}>
                <TextField id="name" label="name" variant="outlined" inputRef={newChildName}/>
                <Button onClick={addChild}>save</Button>
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

export default ChildrenList;