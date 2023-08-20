import {useNavigate} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import React, {useRef, useState} from "react";
import TableCell from "@mui/material/TableCell";
import {DeleteButtonCell, EditableTableCell, SaveButtonCell, CancelButtonCell} from "./TableCell";
import TextField from "@mui/material/TextField";
import {TextButtonTableCell} from "./components";

export const BaseTableRow = (props) => {
    const {item, columns, query, baseUrl} = props;
    const navigate = useNavigate();
    const deleteMutation = query.useDelete(item.id)

    const onDeleteHandler = event => {
        event.stopPropagation();
        deleteMutation.mutate();
    }

    return (
        <TableRow key={`row-${item.id}`} onClick={() => navigate(baseUrl + "/" + item.id)}>
            {columns.map(
                (column) =>
                    column && (
                        <TableCell
                            key={`cell-${item.id}-${column}`}
                        >
                            {item[column.toLowerCase()]}
                        </TableCell>
                    )
            )}
            <TableCell></TableCell>
            <DeleteButtonCell onClick={event => onDeleteHandler(event)}/>
        </TableRow>
    );
};


export const EditableTableRow = (props) => {
    const {item, name, valueName, query, blockedState, setBlockedState} = props;
    const [editState, setEditState] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const deleteMutation = query.useDelete(item.id);
    const updateMutation = query.useUpdate(item.id);
    const [value, setValue] = useState();

    const onClickHandler = item => {
        if (blockedState) {
            setErrorState(true);
        } else {
            setBlockedState(true);
            setEditState(true);
        }
    }

    const onCancelHandler = () => {
        setEditState(false);
        setBlockedState(false);
    }

    const onSaveHandler = () => {
        const newItem = {id: item.id};
        item[valueName] = value;
        updateMutation.mutate(newItem);
        setEditState(false);
        setBlockedState(false);
    }

    const onDeleteHandler = event => {
        event.stopPropagation();
        deleteMutation.mutate();
    }

    // TODO: Add error handling when other field is clicked during edition

    return (
        <TableRow key={`row-${item.id}`} onClick={() => onClickHandler(item)}>
            {
                editState ? (
                    <>
                        <EditableTableCell
                            key={`cell-${item.id}-${name}`}
                            id={item.id}
                            name={name}
                            value={item[valueName]}
                            query={query}
                            error={errorState}
                            onChange={setValue}
                        />
                        <SaveButtonCell onClick={onSaveHandler}/>
                        <CancelButtonCell onClick={onCancelHandler}/>
                    </>
                ) : (
                    <>
                        <TableCell key={`cell-${item.id}-${name}`}>
                            {item[valueName]}
                        </TableCell>
                        <TableCell></TableCell>
                        <DeleteButtonCell onClick={event => onDeleteHandler(event)}/>
                    </>
                )
            }
        </TableRow>
    );
};


export const NewTableRow = props => {
    const {columns, query, blockedState, setBlockedState} = props;
    const [editState, setEditState] = useState(false);
    const createMutation = query.useCreate();

    const onSaveHandler = () => {
        const newItem = {};
        item[name] = value;
        updateMutation.mutate(newItem);
    }

    return (
        <>

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
        </>
    )
}