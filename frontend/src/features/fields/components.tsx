import * as React from "react";
import {Title} from "../../shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import {FieldsQuery} from "./queries";
import {Box } from "@mui/material/Box";

import {
    AddIconButton,
    CustomTableHead,
    ErrorBox,
    Spinner,
    TableRowList,
    TextButtonTableCell,
} from "../../shared";
import query from "../../shared/query";

const FieldsQueryContentext = React.createContext(null);

export const FieldList = () => {
    const query = FieldsQuery();
    const fieldList = query.useList();
    const createMutation = query.useCreate();
    const [editState, setEditState] = React.useState<boolean>(false);
    const nameRef: React.MutableRefObject<HTMLInputElement | undefined> = React.useRef<undefined>();
    const columns: string[] = ["Name", "", ""];

    const save = (): void => {
        createMutation.mutate({
            name: nameRef.current?.value,
        });
        setEditState(false);
    };

    return <>
        <Title>Fields</Title>
        <FieldsQueryContext.Provider value={query}>
        {fieldList.isError && <ErrorBox msg={fieldList.error instanceof Error && fieldList.error.message}/>}
        {fieldList.isLoading && <Spinner/>}
        {fieldList.isSuccess && fieldList.data && (
            <>
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
            </FieldsQueryContext.Provider>
    </>
};


export const FieldForm = (id = null) => {
    query = React.useContext(FieldsQueryContentext);
    const nameRef = React.useRef();

    const save = () => {
        field = {
            name: nameRef.value,
        }
        if (id) {
            mutation = query.useUpdate(id);
        } else {
            mutation = query.useCreate();
        }
        mutation.mutate(field);
    }

    return <Box>
        <TextField
            id="new"
            label="name"
            variant="outlined"
            inputRef={nameRef}
        />
    </Box>
}
