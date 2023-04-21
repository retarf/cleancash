import React, { useState, useRef } from 'react';
import Title from '../Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function SalaryList(props) {

    const salaryDate = useRef();
    const salaryValue = useRef();
    const salaryChild = useRef();
    const [editOnState, setEditOnState] = useState(false);

    const toggleEditOnStateHandler = () => {
        setEditOnState(true);
    };

    const addSalary = () => {
        props.onAddSalary(
            salaryDate.current.value,
            salaryValue.current.value,
            salaryChild.current.value
        );
        setEditOnState(false);
    };

    return <React.Fragment>
  <Grid item xs={12}>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Salary List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Child</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.salaryState.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.child}</TableCell>
            </TableRow>
          ))}
          {editOnState ? <Grid item xs={12}>
                <TextField id="date" label="date" variant="outlined" inputRef={salaryDate}/>
                <TextField id="value" label="value" variant="outlined" inputRef={salaryValue}/>
                <TextField id="child" label="child" variant="outlined" inputRef={salaryChild}/>
                <Button onClick={addSalary}>save</Button>
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

export default SalaryList;
