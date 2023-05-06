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
import { ChildrenQuery, ChildQuery } from './queries'
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
import AddIcon from '@mui/icons-material/Add';

import FormControlLabel from '@mui/material/FormControlLabel';

import { useQueryClient, useQuery, useQueries, useMutation } from "@tanstack/react-query";
import { Request } from "/app/src/core";


export const Children = ({ setChildId }) => {

    const query = ChildQuery()
    const childList = query.useList();

    return <React.Fragment>
      <Stack direction="row" spacing={1}>
          <Title>Children</Title>
          <IconButton aria-label="add" >
              <AddIcon />
          </IconButton>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {childList.status === "loading" ? (
                    <TableRow key={"loading"}>
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                ) : childList.status === "error" ? (
                    <TableRow key={"error"}>
                        <TableCell>Error: {childList.error.message}</TableCell>
                    </TableRow>
                ) : (
                    // TODO: Remove unnecessary data attribute
                    childList.data.data.map((child) =>
                        <TableRow key={child.id} onClick={ () => { setChildId(child.id) }} hover={ true }>
                            <TableCell>{child.name}</TableCell>
                        </TableRow>
                    )
                )
            }
        </TableBody>
      </Table>
    </React.Fragment>
}

export const Child = ({ childId, setChildId }) => {
    const query = ChildQuery();
    const child = query.useRead(childId);
    const updateMutation = query.useUpdate(childId);
    const [ checked, setChecked ] = useState([]);
    const [ name, setName ] = useState();
    const [ editState, setEditState ] = useState(false);
    const fields = useFields();
    const nameRef = useRef();

    const enableEditState = (event) => {
        setEditState(true);
    }

    const disableEditState = (event) => {
        if (event.code == "Enter") {
            setName(event.target.value);
            setEditState(false);
        }
    }

    const handleToggle = (event) => {
        let value = event.target.tabIndex;
        if (!checked.includes(value)) {
          setChecked((preChecked) => [...preChecked, value])
        } else {
          const currentIndex = checked.indexOf(value);
          let newChecked = [...checked];
          newChecked.splice(currentIndex, 1);
          setChecked(newChecked);
        }
    };

    const save = () => {
        let child = {
            id: childId,
            name: name,
            fields: checked
        }
        updateMutation.mutate(child);
    }

    useEffect(() => {
        if (child.status === "success") {
            setChecked(child.data.data.fields);
            setName(child.data.data.name);
        }
    },[child.status])

    return (<React.Fragment>
                     {!childId || child.status === "loading" ? (
                        "Loading..."
                      ) : child.status === "error" ? (
                        <span>Error: {child.error.message}</span>
                      ) : (
                        <>
                          <Stack direction="row" spacing={1}>
                              { editState ? <TextField defaultValue={ name } onKeyDown={ disableEditState } inputRef={ nameRef } /> : <h1 onClick={ enableEditState }>{ name }</h1> }
                              <IconButton aria-label="edit" onClick={ enableEditState } >
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
                              fields.status === "loading" ? (
                                "Loading..."
                              ): fields.status === "error" ? (
                                <span>Error: {fields.error.message}</span>
                              ) : (
                                  fields.data.data.map((field) => {
                                  const labelId = `checkbox-list-label-${field.id}`;
                                  return (
                                      <ListItem
                                        key={field.id}
                                        disablePadding
                                      >
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              id={ labelId }
                                              checked={ checked.includes(field.id) }
                                              tabIndex={ field.id }
                                              inputProps={{ 'aria-labelledby': labelId }}
                                              onChange={ handleToggle }
                                            />
                                          }
                                          label={ field.name }
                                        />
                                      </ListItem>
                                    );
                                  })
                              )
                          }
                          </List>
                          <div>{child.isFetching ? "Background Updating..." : " "}</div>
                        </>
                      )}
      <button onClick={ save }>save</button>
      <button onClick={ () => { setChildId(-1) } }>back</button>
    </React.Fragment>)
}