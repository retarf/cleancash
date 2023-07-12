import React, {useEffect, useState, useRef} from "react";
import {Title} from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {ChildQuery} from "./queries";
import {FieldsQuery} from "/app/src/features/fields/queries";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from "@mui/material/FormControlLabel";
import DangerousIcon from '@mui/icons-material/Dangerous';

import {EditableTitle} from "/app/src/shared";

export const Child = ({childId, setChildId}) => {
    switch (childId) {
        case -1:
            return <ChildList setChildId={setChildId}/>;
            break;
        case 0:
            return <ChildForm childId={childId} setChildId={setChildId}/>;
            break;
        default:
            return <ChildDetails childId={childId} setChildId={setChildId}/>;
    }
};

export const ChildList = ({setChildId}) => {
    const query = ChildQuery();
    const childList = query.useList();

    return (
        <React.Fragment>
            <Title>Children</Title>
            {childList.isError && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    color: 'red',
                    fontWeight: 'bold',
                }}>
                    <DangerousIcon/>
                    <span>Error: {childList.error.message}</span>
                </Box>
            )}
            {childList.isLoading &&
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            }
            {childList.isSuccess &&
                childList.data &&
                <>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                childList.data.data.map((child) => (
                                    // TODO: Remove unnecessary data attribute
                                    <TableRow
                                        key={child.id}
                                        onClick={() => {
                                            setChildId(child.id);
                                        }}
                                        hover={true}
                                    >
                                        <TableCell>{child.name}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <IconButton onClick={() => setChildId(0)} aria-label="add">
                        <AddIcon/>
                    </IconButton>
                </>
            }
        </React.Fragment>
    )
        ;
};

export const ChildDetails = ({childId, setChildId}) => {
    const query = ChildQuery();
    const child = query.useRead(childId);
    const updateMutation = query.useUpdate(childId);
    const deleteMutation = query.useDelete(childId);
    const [checked, setChecked] = useState([]);
    const [name, setName] = useState();
    const fieldsQuery = FieldsQuery();
    const fields = fieldsQuery.useList();

    const handleToggle = (event) => {
        let value = event.target.tabIndex;
        if (!checked.includes(value)) {
            setChecked((preChecked) => [...preChecked, value]);
        } else {
            const currentIndex = checked.indexOf(value);
            let newChecked = [...checked];
            newChecked.splice(currentIndex, 1);
            setChecked(newChecked);
        }
    };

    const save = () => {
        let child = {
            id: childId,
            name: name,
            fields: checked,
        };
        updateMutation.mutate(child);
    };

    const del = () => {
        deleteMutation.mutate();
        setChildId(-1);
    };

    useEffect(() => {
        if (child.status === "success") {
            setChecked(child.data.data.fields);
            setName(child.data.data.name);
        }
    }, [child.status]);

    return (
        <React.Fragment>
            {!childId || child.isLoading || (fields.isLoading && "Loading...")}
            {fields.isError && <span>Error: {fields.error.message}</span>}
            {child.isError && <span>Error: {child.error.message}</span>}
            {
                <>
                    <EditableTitle
                        defaultValue={name}
                        defaultState={false}
                        setTitle={setName}
                    />
                    <Stack direction="row" spacing={1}>
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={del}/>
                        </IconButton>
                    </Stack>
                    <List
                        sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}}
                    >
                        {fields.isSuccess &&
                            fields.data &&
                            fields.data.data.map((field) => {
                                const labelId = `checkbox-list-label-${field.id}`;
                                return (
                                    <ListItem key={field.id} disablePadding>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id={labelId}
                                                    checked={checked.includes(field.id)}
                                                    tabIndex={field.id}
                                                    inputProps={{"aria-labelledby": labelId}}
                                                    onChange={handleToggle}
                                                />
                                            }
                                            label={field.name}
                                        />
                                    </ListItem>
                                );
                            })}
                    </List>
                    <div>{child.isFetching && "Background Updating..."}</div>
                </>
            }
            <Stack direction="row" spacing={3}>
                <Button variant="outlined" onClick={save}>
                    save
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setChildId(-1);
                    }}
                >
                    back
                </Button>
            </Stack>
        </React.Fragment>
    );
};

export const ChildForm = ({childId, setChildId}) => {
    const query = ChildQuery();
    const createMutation = query.useCreate();
    const [checked, setChecked] = useState([]);
    const [name, setName] = useState();
    const fieldsQuery = FieldsQuery();
    const fields = fieldsQuery.useList();

    const handleToggle = (event) => {
        let value = event.target.tabIndex;
        if (!checked.includes(value)) {
            setChecked((preChecked) => [...preChecked, value]);
        } else {
            const currentIndex = checked.indexOf(value);
            let newChecked = [...checked];
            newChecked.splice(currentIndex, 1);
            setChecked(newChecked);
        }
    };

    const save = () => {
        let child = {
            name: name,
            fields: checked,
        };
        createMutation.mutate(child);
    };

    return (
        <React.Fragment>
            <EditableTitle
                defaultValue={name}
                defaultState={true}
                setTitle={setName}
            />
            <Stack direction="row" spacing={1}>
                <IconButton aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </Stack>
            <List sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}}>
                {fields.isLoading && "Loading..."}
                {fields.isError && <span>Error: {fields.error.message}</span>}
                {fields.isSuccess &&
                    fields.data &&
                    fields.data.data.map((field) => {
                        const labelId = `checkbox-list-label-${field.id}`;
                        return (
                            <ListItem key={field.id} disablePadding>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id={labelId}
                                            checked={checked.includes(field.id)}
                                            tabIndex={field.id}
                                            inputProps={{"aria-labelledby": labelId}}
                                            onChange={handleToggle}
                                        />
                                    }
                                    label={field.name}
                                />
                            </ListItem>
                        );
                    })}
            </List>
            <Stack direction="row" spacing={3}>
                <Button variant="contained" onClick={save}>
                    save
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setChildId(-1);
                    }}
                >
                    back
                </Button>
            </Stack>
        </React.Fragment>
    );
};
