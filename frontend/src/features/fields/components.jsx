import React, {useState, useRef} from "react";
import {Title} from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {FieldsQuery} from "./queries";
import {EditableTableCell, DeleteCell} from "/app/src/shared";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export const FieldList = () => {
    const query = FieldsQuery();
    const fieldList = query.useList();
    const createMutation = query.useCreate();
    const [editState, setEditState] = useState(false);
    const name = useRef();

    const save = () => {
        createMutation.mutate({name: name.current.value});
        setEditState(false);
    };

    return (
        <React.Fragment>
            <Title>Fields</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fieldList.isLoading && (
                        <TableRow key={"loading"}>
                            <TableCell>Loading...</TableCell>
                        </TableRow>
                    )}
                    {fieldList.isError && (
                        <TableRow key={"error"}>
                            <TableCell>Error: {fieldList.error.message}</TableCell>
                        </TableRow>
                    )}
                    {fieldList.isSuccess &&
                        fieldList.data &&
                        // TODO: Remove unnecessary data attribute
                        fieldList.data.data.map((field) => (
                            <FieldDetails
                                key={field.id}
                                id={field.id}
                                name={field.name}
                                query={query}
                            />
                        ))}
                    {editState && (
                        <TableRow key="new">
                            <TableCell>
                                <TextField
                                    id="name"
                                    label="name"
                                    variant="outlined"
                                    // TODO: nameRef
                                    inputRef={name}
                                />
                            </TableCell>
                            <TableCell>
                                <Button onClick={save} disabled={createMutation.isLoading}>
                                    save
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => setEditState(false)} disabled={createMutation.isLoading}>
                                    cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <IconButton onClick={() => setEditState(true)} aria-label="add">
                <AddIcon/>
            </IconButton>
        </React.Fragment>
    );
};

const FieldDetails = ({id, name, query}) => {
    const [editState, setEditState] = useState(false);
    const [nameState, setNameState] = useState(name);

    return (
        <TableRow>
            <EditableTableCell
                id={id}
                name="name"
                defaultValue={nameState}
                query={query}
            />
            <TableCell></TableCell>
            <DeleteCell id={id} query={query}/>
        </TableRow>
    );
};
