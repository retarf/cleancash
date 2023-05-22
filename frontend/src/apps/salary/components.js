import React, { useState, useRef, useEffect } from "react";
import { Title } from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Query } from "/app/src/core";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { EditableTableCell, DeleteCell } from "/app/src/shared";

function SalaryList(props) {
  const query = Query("salary");
  const salaryList = query.useList();
  const createMutation = query.useCreate();

  const date = useRef();
  const value = useRef();
  const [editState, setEditState] = useState(false);

  const salaryState = [];

  const enableEditState = () => {
    setEditState(true);
  };

  const save = () => {
    createMutation.mutate({
      date: date.current.value,
      value: value.current.value,
    });
    setEditState(false);
  };

  return (
    <React.Fragment>
      <Title>Salary List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaryList.status === "loading" ? (
            <TableRow key={"loading"}>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ) : salaryList.status === "error" ? (
            <TableRow key={"error"}>
              <TableCell>Error: {salaryList.error.message}</TableCell>
            </TableRow>
          ) : (
            salaryList.data?.data.map((row) => (
              <SalaryDetails
                key={row.id}
                id={row.id}
                date={row.date}
                value={row.value}
                query={query}
              />
            ))
          )}
          {editState ? (
            <TableRow key="new">
              <TableCell>
                <TextField
                  id="date"
                  label="date"
                  variant="outlined"
                  inputRef={date}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="value"
                  label="value"
                  variant="outlined"
                  inputRef={value}
                />
              </TableCell>
              <TableCell>
                <Button onClick={save}>save</Button>
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
      <IconButton onClick={enableEditState} aria-label="add">
        <AddIcon />
      </IconButton>
    </React.Fragment>
  );
}

const SalaryDetails = ({ id, date, value, query }) => {
  const updateMutation = query.useUpdate(id);
  const [editState, setEditState] = useState(false);
  const [dateState, setDateState] = useState(date);
  const [valueState, setValueState] = useState(value);

  return (
    <TableRow>
      <EditableTableCell
        id={id}
        name="date"
        defaultValue={dateState}
        query={query}
      />
      <EditableTableCell
        id={id}
        name="value"
        defaultValue={valueState}
        query={query}
      />
      <DeleteCell id={id} query={query} />
    </TableRow>
  );
};

export default SalaryList;
