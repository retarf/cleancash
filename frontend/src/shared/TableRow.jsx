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
import {useForm, SubmitHandler, useController, Controller } from "react-hook-form"
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
    const {item, name, valueName, query, blockedState, setBlockedState, rules} = props;
    const [editState, setEditState] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const deleteMutation = query.useDelete(item.id);
    const updateMutation = query.useUpdate(item.id);
    const [value, setValue] = useState(item[valueName]);

    const {control, handleSubmit, register, formState: {errors}, reset} = useForm();


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
        reset()
    };

    const onSaveHandler = async (data) => {
        const newItem = {id: item.id};
        newItem[valueName] = data[valueName];
        const response = await updateMutation.mutateAsync(newItem);
        setEditState(false);
        setBlockedState(false);
        setValue(response.data.value)
    };

    const onDeleteHandler = (event) => {
        event.stopPropagation();
        deleteMutation.mutate();
    };

    return (
        <TableRow key={`row-${item.id}`} onClick={() => onClickHandler()}>
            {editState ? (
                <>
                    <TableCell>
                        <Controller
                            control={control}
                            name={valueName}
                            render={({field}) => <TextField
                                                    {...field}
                                                    error={!!errors[valueName]?.message}
                                                    helperText={!!errors ? errors[valueName]?.message : ""}
                                                    key={item.id}
                                                    label={valueName}
                                                    defaultValue={item[valueName]}
                                                    value={field.value}
                                                    fullWidth
                                                    variant="standard"
                                                    autoFocus
                                                    margin="dense"
                                                    onChange={field.onChange}
                                                    onChangeText={field.onChange}
                                                />}
                            rules={rules}
                            />
                    </TableCell>
                    <SaveButtonCell onClick={handleSubmit(onSaveHandler)} />
                    <CancelButtonCell onClick={onCancelHandler}/>
                </>
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
