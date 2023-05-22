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
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
const CleaningEdit = ({ cleaningId }) => {
    const query = CleaningQuery();
    const cleaning = query.useRead(cleaningId);
    const childQuery = ChildQuery();
    const childList = childQuery.useList();
    const [date, setDate] = useState();
    const [childId, setChildId] = useState();
    const [childName, setChildName] = useState();

    useEffect(() => {
            if (cleaning.status === "success") {
                setDate(cleaning.data.data.date);
                setChildId(cleaning.data.data.child);
                if (childList.status === "success") {
                    setChildName(childList.data.data.find(child => child.id === cleaning.data.data.child).name)
                }
            }
            console.log( cleaning.status );
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
                        <FormControl fullWidth>
                            <InputLabel id="child-simple-select-label">Child</InputLabel>
                            <Select
                              labelId="child-simple-select-label"
                              id="demo-simple-select"
                              value={child}
                              label="Age"
                              onChange={handleChange}
                            >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>

                 </>
                )
            )
        }
    </>
};
