import {useNavigate, useParams} from "react-router-dom";
import {ChildQuery} from "../queries";
import React, {useEffect, useState} from "react";
import {APP_ROUTES} from "../../../core/routes";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {EditableTitle} from "../../../shared";
import {FieldsQuery} from "../../fields/queries";

export const ChildDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const query = ChildQuery();
    const fetchedChild = query.useRead(params.id);
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
        if (fetchedChild.isSuccess) {
            setChecked(fetchedChild.data.data.fields);
            setName(fetchedChild.data.data.name);
        }
    }, [fetchedChild.status]);

    return (
        <>
            {!params.id || fetchedChild.isLoading || (fields.isLoading && "Loading...")}
            {fields.isError && <span>Error: {fields.error.message}</span>}
            {fetchedChild.isError && <span>Error: {fetchedChild.error.message}</span>}
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
                    <div>{fetchedChild.isFetching && "Background Updating..."}</div>
                </>
            }
            <Stack direction="row" spacing={3}>
                <Button variant="outlined" onClick={save}>
                    save
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate(APP_ROUTES.CHILDREN.LIST);
                    }}
                >
                    back
                </Button>
            </Stack>
        </>
    );
};