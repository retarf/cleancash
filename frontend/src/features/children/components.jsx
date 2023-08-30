import React from "react";
import {useEffect, useState} from "react";
import {Title} from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {ChildQuery} from "./queries";
import {FieldsQuery} from "/app/src/features/fields/queries";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";

import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";

import {EditableTitle, ErrorBox, Spinner} from "/app/src/shared";
import {AddButtonRow, CustomTableHead, TableRowList} from "../../shared";
import {redirect, useNavigate, useParams} from "react-router-dom";
import {APP_ROUTES, BASE_ROUTES} from "../../core/routes";

import {BaseTableRow} from "../../shared";

export const ChildList = () => {
    const navigate = useNavigate();
    const query = ChildQuery();
    const childList = query.useList();
    const columns = ["Name", "", ""];

    return (
        <>
            <Title>Children</Title>
            {childList.isError && <ErrorBox msg={childList.error.message}/>}
            {childList.isLoading && <Spinner/>}
            {childList.isSuccess && childList.data && (
                <>
                    <Table size="small">
                        <CustomTableHead columns={columns}/>
                        <TableBody>
                            {childList.data.data.map(child => {
                                return <BaseTableRow
                                    item={child}
                                    columns={columns}
                                    query={query}
                                    baseUrl={APP_ROUTES.CHILDREN.LIST}
                                />

                            })}
                            <AddButtonRow onClick={() => navigate(BASE_ROUTES.CREATE)}/>
                        </TableBody>
                    </Table>
                </>
            )}
        </>
    );
};

export const ChildDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const query = ChildQuery();
    const child = query.useRead(params.id);
    const updateMutation = query.useUpdate(params.id);
    const deleteMutation = query.useDelete(params.id);
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
            id: params.id,
            name: name,
            fields: checked,
        };
        updateMutation.mutate(child);
        navigate(APP_ROUTES.CHILDREN.LIST);
    };

    const del = () => {
        deleteMutation.mutate();
    };

    useEffect(() => {
        if (child.isSuccess) {
            setChecked(child.data.data.fields);
            setName(child.data.data.name);
        }
    }, [child.status]);

    return (
        <>
            {!params.id || child.isLoading || (fields.isLoading && "Loading...")}
            {fields.isError && <span>Error: {fields.error.message}</span>}
            {child.isError && <span>Error: {child.error.message}</span>}
            {
                <>
                    <EditableTitle
                        defaultValue={name}
                        defaultState={false}
                        setTitle={setName}
                    />
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
                        navigate(APP_ROUTES.CHILDREN.LIST)
                    }}
                >
                    back
                </Button>
            </Stack>
        </>
    );
};

export const ChildForm = () => {
    const navigate = useNavigate();
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
        navigate(APP_ROUTES.CHILDREN.LIST)
    };

    return (
        <>
            <EditableTitle
                defaultValue={name}
                defaultState={true}
                setTitle={setName}
            />
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
                        navigate(APP_ROUTES.CHILDREN.LIST)
                    }}
                >
                    back
                </Button>
            </Stack>
        </>
    );
};
