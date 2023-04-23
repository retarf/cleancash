import React, { useState, useEffect, useRef, createRef } from "react";
import Title from "./Title";
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
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useParams, Outlet } from "react-router-dom";

function List(props) {
  // ARGS: { title: string, createElement: func, deleteElement: func, columns: array(string), elements: array(object) }

  const [deleteList, setDeleteList] = useState([]);

  const changeDeleteList = (event) => {
    let id = event.target.id;
    let list = [...deleteList];
    if (event.target.checked) {
      list = [...deleteList, id];
    } else {
      list.splice(deleteList.indexOf(id), 1);
    }
    setDeleteList(list);
  };

  const getColumnCells = () => {
    return props.columns.map((column) => {
      return (
        <>
          <TableCell width="1%"></TableCell>
          <TableCell variant="head" key={column}>
            {column}
          </TableCell>
        </>
      );
    });
  };

  const getElementRows = () => {
    return props.elements.map((element) => {
      return (
        <TableRow key={element.id}>
          <Checkbox id={element.id} onChange={changeDeleteList} />
          {props.columns.map((column) => {
            return (
              <TableCell key={element[column]}>{element[column]}</TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  const deleteElement = () => {
    props.deleteElement(deleteList);
  };

  const elementRows = getElementRows();
  const columnCells = getColumnCells();


  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>{ props.title }</Title>
          <Table size="small">
            <TableHead>
              <TableRow>{columnCells}</TableRow>
            </TableHead>
            <TableBody>{elementRows}</TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={1}>
        <Button variant="contained" onClick= { props.createElement }>Create</Button>
      </Grid>
      <Grid item xs={1}>
        <Button onClick={ deleteElement } variant="outlined">Delete</Button>
      </Grid>
    </React.Fragment>
  );
}

export default List;
