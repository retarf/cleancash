import React, { useEffect, useState, useRef } from "react";
import { Title } from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams, Outlet } from "react-router-dom";
import { ChildQuery } from "./queries";
import { Query } from "/app/src/core";
import { FieldsQuery } from "/app/src/features/fields/queries";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";

import FormControlLabel from "@mui/material/FormControlLabel";

import {
  useQueryClient,
  useQuery,
  useQueries,
  useMutation,
} from "@tanstack/react-query";
import { Request } from "/app/src/core";

import { EditableTitle } from "/app/src/shared";

export const Child = ({ childId, setChildId }) => {
  switch (childId) {
    case -1:
      return <ChildList setChildId={setChildId} />;
      break;
    case 0:
      return <ChildForm childId={childId} setChildId={setChildId} />;
      break;
    default:
      return <ChildDetails childId={childId} setChildId={setChildId} />;
  }
};

export const ChildList = ({ setChildId }) => {
  const query = ChildQuery();
  const childList = query.useList();

  return (
    <React.Fragment>
      <Title>Children</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {childList.isLoading && (
            <TableRow key={"loading"}>
              <TableCell>Loading...</TableCell>
            </TableRow>
          )}
          {childList.isError && (
            <TableRow key={"error"}>
              <TableCell>Error: {childList.error.message}</TableCell>
            </TableRow>
          )}
          {childList.isSuccess &&
            childList.data &&
            // TODO: Remove unnecessary data attribute
            childList.data.data.map((child) => (
              <TableRow
                key={child.id}
                onClick={() => {
                  setChildId(child.id);
                }}
                hover={true}
              >
                <TableCell>{child.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <IconButton onClick={() => setChildId(0)} aria-label="add">
        <AddIcon />
      </IconButton>
    </React.Fragment>
  );
};

export const ChildDetails = ({ childId, setChildId }) => {
  const query = ChildQuery();
  const child = query.useRead(childId);
  const updateMutation = query.useUpdate(childId);
  const deleteMutation = query.useDelete(childId);
  const [checked, setChecked] = useState([]);
  const [name, setName] = useState();
  const [editState, setEditState] = useState(false);
  const fieldsQuery = FieldsQuery();
  const fields = fieldsQuery.useList();

  const handleToggle = (event) => {
    let value = event.target.tabIndex;
    if (!checked.includes(value)) {
      setChecked((preChecked) => [...preChecked, value]);
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
      fields: checked,
    };
    updateMutation.mutate(child);
  };

  const del = () => {
    deleteMutation.mutate();
    setChildId(-1);
  };

  useEffect(() => {
    if (child.status === "success") {
      setChecked(child.data.data.fields);
      setName(child.data.data.name);
    }
  }, [child.status]);

  return (
    <React.Fragment>
      {!childId || child.isLoading || (fields.isLoading && "Loading...")}
      {fields.isError && <span>Error: {fields.error.message}</span>}
      {child.isError && <span>Error: {child.error.message}</span>}
      {
        <>
          <EditableTitle
            defaultValue={name}
            defaultState={false}
            setTitle={setName}
          />
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="delete">
              <DeleteIcon onClick={del} />
            </IconButton>
          </Stack>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {fields.isSuccess &&
              fields.data &&
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
              })}
          </List>
          <div>{child.isFetching && "Background Updating..."}</div>
        </>
      }
      <Stack direction="row" spacing={3}>
        <Button variant="outlined" onClick={save}>
          save
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setChildId(-1);
          }}
        >
          back
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export const ChildForm = ({ childId, setChildId }) => {
  const query = ChildQuery();
  const createMutation = query.useCreate();
  const [checked, setChecked] = useState([]);
  const [name, setName] = useState();
  const [editState, setEditState] = useState(true);
  const fieldsQuery = FieldsQuery();
  const fields = fieldsQuery.useList();

  const handleToggle = (event) => {
    let value = event.target.tabIndex;
    if (!checked.includes(value)) {
      setChecked((preChecked) => [...preChecked, value]);
    } else {
      const currentIndex = checked.indexOf(value);
      let newChecked = [...checked];
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    }
  };

  const save = () => {
    let child = {
      name: name,
      fields: checked,
    };
    createMutation.mutate(child);
  };

  return (
    <React.Fragment>
      <EditableTitle
        defaultValue={name}
        defaultState={true}
        setTitle={setName}
      />
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {fields.isLoading && "Loading..."}
        {fields.isError && <span>Error: {fields.error.message}</span>}
        {fields.isSuccess &&
          fields.data &&
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
          })}
      </List>
      <Stack direction="row" spacing={3}>
        <Button variant="contained" onClick={save}>
          save
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setChildId(-1);
          }}
        >
          back
        </Button>
      </Stack>
    </React.Fragment>
  );
};
