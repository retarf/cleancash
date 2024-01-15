import * as React from "react";
import {NewData, Title} from "../../../shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {FieldsQuery} from "../queries";
import {Field} from "../models/Field.model";
// import { DataGrid } from '@mui/x-data-grid/DataGrid';
// import { GridToolbarContainer } from '@mui/x-data-grid/GridToolbarContainer';
import {Box} from '@mui/material';
import {Request, baseURL} from "core/api";
import {AxiosError} from "axios";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from '@mui/material/Button';
//import { DataGrid } from '@mui/x-data-grid';
//import { GridToolbar } from '@mui/x-data-grid/GridToolbar';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

import {
    CustomTableHead,
    ErrorBox,
    Spinner,
    EditableTableRow,
} from "../../../shared";
import {useState, useEffect} from "react";

const FieldsContext: React.Context<any> = React.createContext(null);


const Row = (field: Field, query: any): Field => {
    console.log("tu")
    const mutation = query.useUpdate(field.id);
    const response = mutation.mutate(field);
    return field
}

interface EditToolbarProps {
    //setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    rows: Array<any>;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    let {rows: any, setRowModesModel } = props;
    const query = FieldsQuery();
    const mutation = query.useCreate();

    const handleClick = () => {
        const id = 0;
        (rows: any) => [...rows, {id, name: '', age: '', isNew: true}]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name'},
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export const FieldList = () => {
    const query = FieldsQuery();
    //const rows = query.useList();
    const createMutation = query.useCreate();
    const nameRef: React.MutableRefObject<HTMLInputElement | undefined> =
        React.useRef<undefined>();
    const [blockedState, setBlockedState] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [rows, setRows] = React.useState();
    const url: string = `${baseURL}/fields/`;

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
    ]

    const rules = {
        required: true,
    }

    const processRowUpdate = async (updatedRow: Field, oldRow: Field): Promise<Field> => {
        try {
            const request = Request(url);
            const response = await request.patch(updatedRow);
            return response.data;
        } catch (error: any) {
            setErrorMessage(error.message);
            return error.response;
        }
    }

    const processRowUpdateError = (error: Error) => {
        setErrorMessage(error.message);
    }

    const addRow = (data: Field)=> {
      console.log();
    }

    useEffect(async () => {
        const list = await Request(url)
        setRows(list.data)
    }, []);

    return (
        <>
            <Title>Fields</Title>
            {rows.isError && (
                <ErrorBox
                    msg={rows.error instanceof Error && rows.error.message}
                />
            )}
            {!!errorMessage && (
                <ErrorBox
                    msg={errorMessage}
                />
            )}
            {rows.isLoading && <Spinner/>}
            {rows.isSuccess && rows.data && (
                <Box>
                    <DataGrid
                        rows={rows.data.data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5
                                }
                            }
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={processRowUpdateError}
                        slots={{
                            toolbar: EditToolbar,
                        }}
                        slotProps={{
                            toolbar: {rows, setRowModesModel},
                        }}
                    />
                </Box>
            )}
        </>
    );
};
