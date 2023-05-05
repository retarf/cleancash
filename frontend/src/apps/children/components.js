import React, { useEffect, useState, useRef } from 'react';
import { Title } from '/app/src/shared';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams, Outlet } from 'react-router-dom';
import { useChildren, useChild } from './queries'
import { useFields } from '/app/src/apps/fields/queries'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import Stack from '@mui/material/Stack';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export const Children = ({ setChildId }) => {

    const { status, data, error, isFetching } = useChildren();

    return <React.Fragment>
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
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                ) : status === "error" ? (
                    <TableRow key={"error"}>
                        <TableCell>Error: {error.message}</TableCell>
                    </TableRow>
                ) : (
                    data.map((child) =>
                        <TableRow key={child.id} onClick={ () => { setChildId(child.id) }} hover={ true }>
                            <TableCell>{child.name}</TableCell>
                        </TableRow>
                    )
                )
            }
        </TableBody>
      </Table>
              <Grid item xs={12}>
              <Button variant="contained" >Add</Button>
              </Grid>
              <Grid item xs={12}>
              <Button variant="outlined">Delete</Button>
              </Grid>
    </React.Fragment>
}

export const Child = ({ childId, setChildId }) => {
    const child = useChild(childId);
    const [ checked, setChecked ] = useState([0]);
    const fields = useFields();

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        console.log(newChecked);
        setChecked([...newChecked]);
        console.log(checked);
    };

    useEffect(() => {
        if (child.status === "success") {
            setChecked(child.data.fields);
        }
    },[child, checked, setChecked])

    return (<React.Fragment>
                     {!childId || child.status === "loading" ? (
                        "Loading..."
                      ) : child.status === "error" ? (
                        <span>Error: {child.error.message}</span>
                      ) : (
                        <>
                          <Stack direction="row" spacing={1}>
                              <h1>{child.data.name}</h1>
                              <IconButton aria-label="edit">
                                  <ModeEditIcon />
                              </IconButton>
                          </Stack>
                          <Stack direction="row" spacing={1}>
                              <IconButton aria-label="delete">
                                      <DeleteIcon />
                              </IconButton>
                          </Stack>
                          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                          {
                              fields.status == "loading" ? (
                                "Loading..."
                              ): fields.status === "error" ? (
                                <span>Error: {fields.error.message}</span>
                              ) : (
                                  fields.data.map((field) => {
                                  const labelId = `checkbox-list-label-${field.id}`;
                                  return (
                                      <ListItem
                                        key={field.id}
                                        disablePadding
                                      >
                                        <ListItemButton role={undefined} onClick={ handleToggle(field.id) } dense>
                                          <ListItemIcon>
                                            <Checkbox
                                              checked={ checked.includes(field.id) }
                                              tabIndex={-1}
                                              inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                          </ListItemIcon>
                                          <ListItemText id={labelId} primary={ field.name } />
                                        </ListItemButton>
                                      </ListItem>
                                    );
                                  })
                              )
                          }
                          </List>
                          <div>{child.isFetching ? "Background Updating..." : " "}</div>
                        </>
                      )}
      <button onClick={ () => { setChildId(-1) } }>back</button>
    </React.Fragment>)
}