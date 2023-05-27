import React, { useState, useEffect, useRef } from "react";
import { Title } from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams, Outlet } from "react-router-dom";
import { CleaningQuery } from "./queries";
import { FieldsQuery } from "/app/src/apps/fields/queries";
import { ChildQuery } from "/app/src/apps/children/queries";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { DeleteCell } from "/app/src/shared";
import { EditableTitle } from "/app/src/shared";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from "@mui/material/FormControlLabel";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";

export const Cleaning = ({ cleaningId, setCleaningId }) => {
  switch (cleaningId) {
    case -1:
      return <CleaningList setCleaningId={setCleaningId} />;
      break;
    case 0:
      return (
        <CleaningForm cleaningId={cleaningId} setCleaningId={setCleaningId} />
      );
      break;
    default:
      return (
        <CleaningEdit cleaningId={cleaningId} setCleaningId={setCleaningId} />
      );
  }
};

const CleaningList = ({ setCleaningId }) => {
  const [editOnState, setEditOnState] = useState(false);
  const childQuery = ChildQuery();
  const childList = childQuery.useList();
  const fieldsQuery = FieldsQuery();
  const fieldList = fieldsQuery.useList();
  const query = CleaningQuery();
  const cleaningList = query.useList();

  return (
    <React.Fragment>
      <Title>Cleanings List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Child</TableCell>
            <TableCell>Fields</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cleaningList.status === "loading" ? (
            <TableRow key={"loading"}>
              <TableCell>{"loading..."}</TableCell>
            </TableRow>
          ) : cleaningList.status === "error" ? (
            <TableRow key={"error"}>
              <TableCell>{cleaningList.error.message}</TableCell>
            </TableRow>
          ) : (
            cleaningList.data.data.map((cleaning) => {
              return <TableRow key={ cleaning.id } hover={true} onClick={() => { setCleaningId(cleaning.id) }} >
                <TableCell>{cleaning.date}</TableCell>
                <TableCell>
                { childList.status === "loading" ? "loading..." : (
                    childList.status === "error" ? childList.error.message : (
                        childList.data.data.find(child => child.id === cleaning.child).name
                    )
                )
                }
                </TableCell>
                <TableCell>
                  <ul>
                    { fieldList.status === "loading" ? "loading..." : (
                        fieldList.status === "error" ? fieldList.error.message : (
                            cleaning.field.map((fieldId) => {
                                return <li key={ fieldId }>{ fieldList.data.data.find(field => field.id === fieldId ).name }</li>
                            })
                        )
                    )}
                    {cleaning.field.map((field) => {
                      <li>{field}</li>;
                    })}
                  </ul>
                </TableCell>
                <DeleteCell id={cleaning.id} query={query} />
              </TableRow>;
            })
          )}
        </TableBody>
      </Table>
      <IconButton onClick={() => setCleaningId(0)} aria-label="add">
        <AddIcon />
      </IconButton>
    </React.Fragment>
  );
};

const CleaningDetails = ({ cleaning, query }) => {
  return (
    <TableRow>
      <TableCell>{cleaning.date}</TableCell>
      <TableCell>{cleaning.child}</TableCell>
      <TableCell>
        <ul></ul>
      </TableCell>
      <DeleteCell id={cleaning.id} query={query} />
    </TableRow>
  );
};

const CleaningForm = () => {};


const CleaningEdit = ({ cleaningId, setCleaningId }) => {
    const query = CleaningQuery();
    const cleaning = query.useRead(cleaningId);
    const updateMutation = query.useUpdate(cleaningId);
    const childQuery = ChildQuery();
    const childList = childQuery.useList();
    const [date, setDate] = useState();
    const [child, setChild] = useState();
    const fieldQuery = FieldsQuery();
    const fields = fieldQuery.useList();
    const [checked, setChecked] = useState();

    const handleChange = (event) => {
        let child = event.target.value;
        setChild(child);
    };

    const save = () => {
        const cleaning = {
            id: cleaningId,
            date: date,
            child: child.id,
            field: child.field
        }
        updateMutation.mutate(cleaning);
    };

    useEffect(() => {
            if (cleaning.status === "success") {
                setDate(cleaning.data.data.date);
                if (childList.status === "success") {
                    setChild(childList.data.data.find(child => child.id === cleaning.data.data.child));
                }
            }
    }, [cleaning.status, childList.status])

    return <>
        {
            !cleaningId || cleaning.status === "loading" ? (
                "Loading..."
            ) : (
                cleaning.status === "error" ? (
                    cleaning.error.message
                ) : (
                  <>
                  <EditableTitle
                    defaultValue={date}
                    defaultState={false}
                    setTitle={setDate}
                  />
                    { childList.status === "loading" ? <p>{"loading..."}</p> : (
                      childList.status === "error" ? <p>{childList.error.message}</p> : (
                        <FormControl fullWidth>
                            <InputLabel id="child-simple-select-label">Child</InputLabel>
                            <Select
                              labelId="child-simple-select-label"
                              id="child-simple-select"
                              value={child ? child : ''}
                              label="Child"
                              onChange={ handleChange }
                            >
                            <MenuItem key="" value=""></MenuItem>
                            { childList.data.data.map((child) => {
                              return <MenuItem key={child.id} value={child}>{child.name}</MenuItem>
                            }
                            )}
                            </Select>
                          </FormControl>
                      )
                    )}
                  <List
                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                  >
                    {fields.status === "loading" ? (
                      "Loading..."
                    ) : fields.status === "error" ? (
                      <span>Error: {fields.error.message}</span>
                    ) : (
                      fields.data.data.map((field) => {
                        const labelId = `checkbox-list-label-${field.id}`;
                        return (
                          <ListItem key={field.id} disablePadding>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  id={labelId}
                                  checked={checked.includes(field.id)}
                                  tabIndex={field.id}
                                  inputProps={{ "aria-labelledby": labelId }}
                                  onChange={handleToggle}
                                />
                              }
                              label={field.name}
                            />
                          </ListItem>
                        );
                      })
                    )}
                  </List>
                  <Stack direction="row" spacing={3}>
                    <Button variant="outlined" onClick={save}>
                      save
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setCleaningId(-1);
                      }}
                    >
                      back
                    </Button>
                  </Stack>
                 </>
                )
            )
        }
    </>
};
