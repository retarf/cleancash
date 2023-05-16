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
import { CleaningQuery } from './queries'
import { FieldsQuery } from '/app/src/apps/fields/queries'

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { DeleteCell } from "/app/src/shared"

export const Cleaning = ({ cleaningId, setCleaningId }) => {
    switch (cleaningId) {
        case -1:
            return <CleaningList setCleaningId={ setCleaningId } />
            break;
        case 0:
            return <CleaningForm cleaningId={ cleaningId } setCleaningId={ setCleaningId } />
            break;
        default:
            return <CleaningEdit cleaningId={ cleaningId } setCleaningId={ setCleaningId } />
    }
}


const CleaningList = ({ setCleaningId }) => {
  const query = CleaningQuery();
  const cleaningList = query.useList();
  const [editOnState, setEditOnState] = useState(false);


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
              <TableRow>
              <TableCell>test</TableCell>
              <TableCell>test</TableCell>
              <TableCell><ul><li>ttt</li><li>ttt2</li><li>ttt3</li></ul></TableCell>
              <TableCell></TableCell>
              </TableRow>
              ///
              {editOnState ? (
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label="Date"
                    variant="outlined"
                  />
                  <TextField
                    id="child"
                    label="Child"
                    variant="outlined"
                  />
                  <TextField
                    id="fields"
                    label="Fields"
                    variant="outlined"
                  />
                </Grid>
              ) : null}
            </TableBody>
          </Table>
      <IconButton onClick={ () => setCleaningId(0) } aria-label="add" >
          <AddIcon />
      </IconButton>
    </React.Fragment>
  );
}


const CleaningDetails = ({ cleaning, query }) => {
    const fieldsQuery = FieldsQuery();
    const fieldList = fieldsQuery.useList();
    const fieldmapper = fieldList.data.data;



    return (
        <TableRow>
            <TableCell>{ cleaning.date }</TableCell>
            <TableCell>{ cleaning.child }</TableCell>
            <TableCell>
                <ul>
                </ul>
            </TableCell>
            <DeleteCell id={ cleaning.id } query={ query } />
        </TableRow>
        )
    }

const CleaningForm = () => {}
const CleaningEdit = () => {}