import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React from "react";

export const ChildFieldList = ({
                                   cleaningFields,
                                   checked,
                                   setChecked,
                                   amountDispatch,
                               }) => {
    const handleToggle = (event) => {
        let value = event.target.tabIndex;
        let newChecked = [...checked];
        if (!checked.includes(value)) {
            newChecked = [...checked, value];
        } else {
            const currentIndex = checked.indexOf(value);
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        amountDispatch({type: "setChecked", checked: newChecked});
    };

    return (
        <List sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}}>
            {!cleaningFields.length ? (
                <ListItem>no items.</ListItem>
            ) : (
                cleaningFields.map((field) => {
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
                })
            )}
        </List>
    );
};