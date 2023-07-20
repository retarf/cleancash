import * as React from "react";
import {Title} from "../../shared/components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import {FieldsQuery} from "./queries";

import {
    AddIconButton,
    CustomTableHead,
    ErrorBox,
    Spinner,
    TableRowList,
    TextButtonTableCell,
} from "../../shared";

import {CreateFieldResponsePayload} from "./models/CreateField.model";

export const FieldList = () => {
    const query = FieldsQuery();
    const fieldList = query.useList();
    const createMutation = query.useCreate();
    const [editState, setEditState] = React.useState<boolean>(false);
    const nameRef: React.MutableRefObject<any> = React.useRef();
    const columns: string[] = ["Name", "", ""];

    const save = (): void => {
        createMutation.mutate({
            name: nameRef.current.value,
        });
        setEditState(false);
    };

    return <>
        <Title>Fields</Title>
        {fieldList.isError && <ErrorBox msg={fieldList.error instanceof Error && fieldList.error.message}/>}
        {fieldList.isLoading && <Spinner/>}
        {fieldList.isSuccess && fieldList.data && (
            <>
                {console.log(fieldList.data)}
                <Table size="small">
                    <CustomTableHead columns={columns}/>
                    <TableBody>
                        <TableRowList
                            itemList={fieldList.data.data}
                            columns={columns}
                            query={query}
                            editable={true}
                        />
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
                <AddIconButton onClick={() => setEditState(true)}/>
            </>
        )}
    </>
};
