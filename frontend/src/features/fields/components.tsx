import * as React from "react";
import {Title} from "../../shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import {FieldsQuery} from "./queries";
import Box from '@mui/material/Box';
import { Field } from './models/Field.model'


import {
    AddIconButton,
    CustomTableHead,
    ErrorBox,
    Spinner,
    EditableTableRow,
    TextButtonTableCell,
} from "../../shared";
import query from "../../shared/query";
import {useContext, useState} from "react";
import Button from "@mui/material/Button";
import {QueryBy} from "@testing-library/react";


const FieldsContext: React.Context<any> = React.createContext(null);

export const FieldList = () => {
    const query = FieldsQuery();
    const fieldList = query.useList();
    const createMutation = query.useCreate();
    const nameRef: React.MutableRefObject<HTMLInputElement | undefined> = React.useRef<undefined>();
    const columns: string[] = ["Name", "", ""];
    const [blockedState, setBlockedState] = useState<boolean>(false);
    // const contextValue = {
    //     query: query,
    //     editState: editState,
    //     setEditState: setEditState,
    // }

    // const save = (): void => {
    //     createMutation.mutate({
    //         name: nameRef.current?.value,
    //     });
    //     setEditState(null);
    // };

    // const onClickHandler = (field: Field) => {
    //     if (editState) {
    //     }

    // }

    return <>
        <Title>Fields</Title>
        {fieldList.isError && <ErrorBox msg={fieldList.error instanceof Error && fieldList.error.message}/>}
        {fieldList.isLoading && <Spinner/>}
        {fieldList.isSuccess && fieldList.data && (
            <>
                <Table size="small">
                    <CustomTableHead columns={columns}/>
                    <TableBody>
                        {fieldList.data.data.map((field: Field): React.ReactElement => {
                            return <EditableTableRow
                                item={field}
                                columns={columns}
                                query={query}
                                blockedState={blockedState}
                                setBlockedState={setBlockedState}
                            />
                        })}
                    </TableBody>
                </Table>
                <AddIconButton onClick={() => setBlockedState(true)}/>
            </>
        )}
    </>
};

export const FieldDetails = () => {
}


export const FieldForm = (id = null) => {
    const query = React.useContext(FieldsContext);
    const nameRef = React.useRef();

    const save = () => {
        const field = {
            name: nameRef.current,
        }
        const mutation = id ? query.useUpdate(id) : query.useCreate();
        mutation.mutate(field);
    }

    return <Box>
        <TextField
            id="new"
            label="name"
            variant="outlined"
            inputRef={nameRef}
        />
        <Button>Save</Button>
        <Button>Cancel</Button>
    </Box>
}
