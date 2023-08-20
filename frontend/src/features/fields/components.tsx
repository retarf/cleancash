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
                                name="field"
                                valueName="name"
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