import React, { useState, useEffect, useRef } from "react";
import Title from "../Title";
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
import axios from "axios";
import { useParams, Outlet } from "react-router-dom";
import List from "../list";

function ChildrenList(props) {
  const { id } = useParams;
  const newChildName = useRef();
  const [editOnState, setEditOnState] = useState(false);

  const toggleEditOnStateHandler = () => {
    setEditOnState(true);
  };

  const addChild = (newChildName) => {
    props.onAddChild(newChildName);
    setEditOnState(false);
  };

  const columns = ["name"];
  const elements = props.childrenState;

  return <List columns={columns} elements={elements} addElement={addChild} />;
}

export default ChildrenList;
