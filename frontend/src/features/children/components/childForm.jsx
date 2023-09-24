import {useNavigate} from "react-router-dom";
import {ChildQuery} from "../queries";
import React, {useState} from "react";
import {APP_ROUTES} from "../../../core/routes";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {EditableTitle} from "../../../shared";
import {FieldsQuery} from "../../fields/queries";

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
        navigate(APP_ROUTES.CHILDREN.LIST);
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
                        navigate(APP_ROUTES.CHILDREN.LIST);
                    }}
                >
                    back
                </Button>
            </Stack>
        </>
    );
};