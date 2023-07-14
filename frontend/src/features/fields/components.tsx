import React, {useState, useRef} from "react";
import {Title} from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import {FieldsQuery} from "./queries";
import {EditableTableCell, DeleteCell} from "/app/src/shared";

import {AddIconButton, CustomTableHead, ErrorBox, Spinner, TableRowList, TextButtonTableCell} from "../../shared";

import CreateFieldResponsePayload from "./models/CreateField.model";

export const FieldList = () => {
    const query = FieldsQuery();
    const fieldList = query.useList();
    const createMutation = query.useCreate();
    const [editState, setEditState] = useState(false);
    const nameRef = useRef();
    const columns = ["Name", "", ""];


    const save = () => {
        createMutation.mutate<CreateFieldResponsePayload>({
            name: nameRef.current.value,
        });
        setEditState(false);
    };


    return (
        <React.Fragment>
            <Title>Fields</Title>
            {fieldList.isError && <ErrorBox msg={fieldList.error.message}/>}
            {fieldList.isLoading && <Spinner/>}
            {fieldList.isSuccess && fieldList.data &&
                <>
                    <Table size="small">
                        <CustomTableHead columns={columns}/>
                        <TableBody>
                            <TableRowList itemList={fieldList.data.data} columns={columns} query={query} editable={true}/>
                            {editState && (
                                <TableRow key="new">
                                    <TableCell>
                                        <TextField
                                            id="new"
                                            label="name"
                                            variant="outlined"
                                            inputRef={nameRef}
                                        />
                                    </TableCell>
                                    <TextButtonTableCell text="save" onClick={save}
                                                         disabled={createMutation.isLoading}/>
                                    <TextButtonTableCell text="cancel" onClick={() => setEditState(false)}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <AddIconButton onClick={() => setEditState(true)}/>
                </>
            }
        </React.Fragment>
    );
};