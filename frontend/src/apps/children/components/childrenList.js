import React, { useEffect, useState, useRef } from 'react';
import { Title } from '/app/src/shared';
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
import { useParams, Outlet } from 'react-router-dom';
import { useChildren } from '../queries'



const Children = ({ setChildId }) => {

    const { status, data, error, isFetching } = useChildren();

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
            {status === "loading" ? (
                    <TableRow key={"loading"}>
                        <h2>Loading...</h2>
                    </TableRow>
                ) : status === "error" ? (
                    <TableRow key={"error"}>
                        <TableCell>Error: {error.message}</TableCell>
                    </TableRow>
                ) : (
                    data.map((child) =>
                        <TableRow key={child.id}>
                            <TableCell>{child.name}</TableCell>
                        </TableRow>
                    )
                )
            }
        </TableBody>
      </Table>
                </Paper>
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" >Add</Button>
              </Grid>
              <Grid item xs={12}>
              <Button variant="outlined">Delete</Button>
              </Grid>
    </React.Fragment>
}

export default Children;