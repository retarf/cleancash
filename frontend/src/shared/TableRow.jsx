import {useNavigate} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import React, {useState} from "react";
import TableCell from "@mui/material/TableCell";
import {
    DeleteButtonCell,
    EditableTableCell,
    SaveButtonCell,
    CancelButtonCell,
    AddButtonCell, SubmitButtonCell,
} from "./TableCell";
import TextField from "@mui/material/TextField";
import {AddIconButton} from "./components";
import Box from "@mui/material/Box";
import {useForm, Controller, SubmitHandler} from "react-hook-form"
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

export const BaseTableRow = (props) => {
    const {item, columns, query, baseUrl} = props;
    const navigate = useNavigate();
    const deleteMutation = query.useDelete(item.id);

    const onDeleteHandler = (event) => {
        event.stopPropagation();
        deleteMutation.mutate();
    };

    return (
        <TableRow
            key={`row-${item.id}`}
            onClick={() => navigate(baseUrl + "/" + item.id)}
        >
            {columns.map(
                (column) =>
                    column && (
                        <TableCell key={`cell-${item.id}-${column}`}>
                            {item[column.toLowerCase()]}
                        </TableCell>
                    )
            )}
            <TableCell></TableCell>
            <DeleteButtonCell onClick={(event) => onDeleteHandler(event)}/>
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

    const {control, handleSubmit, register, formState: {errors}} = useForm();


    const onClickHandler = (item) => {
        if (blockedState) {
            setErrorState(true);
        } else {
            setBlockedState(true);
            setEditState(true);
        }
    };

    const onCancelHandler = () => {
        setEditState(false);
        setBlockedState(false);
    };

    const onSaveHandler = () => {
        const newItem = {id: item.id};
        newItem[valueName] = value;
        updateMutation.mutate(newItem);
        setEditState(false);
        setBlockedState(false);
    };

    const onSubmit = data => {
        console.log(data);
    }

    const onDeleteHandler = (event) => {
        event.stopPropagation();
        deleteMutation.mutate();
    };

    // TODO: Add error handling when other field is clicked during edition

    return (
        <TableRow key={`row-${item.id}`} onClick={() => onClickHandler(item)}>
            {editState ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TableCell>
                        <p>test</p>
                        <TextField
                            error={error}
                            key={id}
                            //label={name}
                            label={"test"}
                            defaultValue={value}
                            fullWidth
                            variant="standard"
                            autoFocus
                            margin="dense"
                        />
                    </TableCell>
                    <p>test</p>
                    <SubmitButtonCell/>
                    <CancelButtonCell onClick={onCancelHandler}/>
                    <p>test</p>
                </form>
            ) : (
                <>
                    <TableCell key={`cell-${item.id}-${name}`}>
                        {item[valueName]}
                    </TableCell>
                    <TableCell></TableCell>
                    <DeleteButtonCell onClick={(event) => onDeleteHandler(event)}/>
                </>
            )}
        </TableRow>
    );
};

export const NewData = (props) => {
    const {name, valueName, query, blockedState, setBlockedState, rules} = props;
    const createMutation = query.useCreate();
    const [editState, setEditState] = useState(false);

    const {control, handleSubmit, formState: {errors}, reset} = useForm();

    const onCancelHandler = () => {
        setEditState(false);
        setBlockedState(false);
        reset();
    };

    const onSubmit = data => {
        const newItem = {};
        newItem[valueName] = data[name];
        createMutation.mutate(newItem);
        setEditState(false);
        setBlockedState(false);
        reset();
    }

    return (
        <>
            {editState ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        render={({field}) =>
                            <TextField
                                {...field}
                                error={!!errors[name]}
                                label={name}
                                fullWidth
                                autoFocus
                                helperText={!!errors[name] ? errors[name]?.message : ""}
                            />
                        }
                        control={control}
                        name={name}
                        defaultValue=""
                        rules={rules}
                    />
                    <IconButton aria-label="Submit" type="submit" children={<SaveIcon/>}/>
                    <IconButton aria-label="Cancel" onClick={onCancelHandler} children={<CancelIcon/>}/>
                </form>
            ) : (
                <IconButton aria-label="Add" onClick={() => setEditState(true)} children={<AddIcon/>}/>
            )
            }
        </>
    )
        ;
};

export const AddButtonRow = ({onClick, rows = 3}) => {
    return (
        <TableRow>
            <TableCell colSpan={rows} sx={{borderBottom: "none"}}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <AddIconButton onClick={onClick}/>
                </Box>
            </TableCell>
        </TableRow>
    );
};
