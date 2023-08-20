import React, { useState, useRef } from "react";
import { Title } from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

import { Query } from "/app/src/core";

import {
  AddIconButton, BaseTableRow,
  CustomTableHead, EditableTableRow,
  ErrorBox,
  Spinner,
  TableRowList,
  TextButtonTableCell,
} from "../../shared";
import {APP_ROUTES} from "../../core/routes";

function SalaryList(props) {
  const query = Query("salary");
  const salaryList = query.useList();
  const createMutation = query.useCreate();
  const valueRef = useRef();
  const [editState, setEditState] = useState(false);
  const columns = ["Value", "", ""];
  const [blockedState, setBlockedState] = useState(false);

  const enableEditState = () => {
    setEditState(true);
  };

  const save = () => {
    createMutation.mutate({
      value: valueRef.current.value,
    });
    setEditState(false);
  };

  return (
    <React.Fragment>
      <Title>Salary List</Title>
      {salaryList.isError && <ErrorBox msg={salaryList.error.message} />}
      {salaryList.isLoading && <Spinner />}
      {salaryList.isSuccess && salaryList.data && (
        <>
          <Table size="small">
            <CustomTableHead columns={columns} />
            <TableBody>
              {salaryList.data.data.map(salary => {
                  return <EditableTableRow
                      item={salary}
                      name="salary"
                      valueName="value"
                      query={query}
                      blockedState={blockedState}
                      setBlockedState={setBlockedState}
                    />

                  }
              )}
              {editState && (
                <TableRow key="new">
                  <TableCell>
                    <TextField
                      id="new"
                      label="value"
                      variant="outlined"
                      inputRef={valueRef}
                    />
                  </TableCell>
                  <TextButtonTableCell
                    text="save"
                    onClick={save}
                    disabled={createMutation.isLoading}
                  />
                  <TextButtonTableCell
                    text="cancel"
                    onClick={() => setEditState(false)}
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <AddIconButton onClick={enableEditState} />
        </>
      )}
    </React.Fragment>
  );
}

export default SalaryList;
