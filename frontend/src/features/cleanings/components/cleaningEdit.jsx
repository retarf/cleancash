import {useNavigate, useParams} from "react-router-dom";
import {CleaningQuery} from "../queries";
import React, {useEffect, useReducer, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {ChildFieldList} from "./childFieldList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {ChildQuery} from "../../children/queries";
import {FieldsQuery} from "../../fields/queries";
import {AmountReducer} from "./cleaningForm";
import {APP_ROUTES} from "../../../core/routes";

export const CleaningEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const query = CleaningQuery();
    const cleaning = query.useRead(params.id);
    const updateMutation = query.useUpdate(params.id);
    const childQuery = ChildQuery();
    const childList = childQuery.useList();
    const [date, setDate] = useState();
    const [child, setChild] = useState();
    const [defaultChild, setDefaultChild] = useState();
    const fieldQuery = FieldsQuery();
    const fields = fieldQuery.useList();
    const [checked, setChecked] = useState([]);
    const [cleaningFields, setCleaningFields] = useState([]);
    const [testId, setTestId] = useState();

    const [amount, amountDispatch] = useReducer(AmountReducer, {
        child: undefined,
        salary: undefined,
        checked: [],
        sum: 0,
    });

    const getFieldById = (id) =>
        fields.data.data.find((field) => (field ? field.id === id : null));

    const getCleaningFields = (child, cleaning) => {
        if (child === defaultChild) {
            let allChildField = [
                ...new Set([...child.fields, ...cleaning.data.data.field]),
            ];
            return allChildField.map((id) => {
                return getFieldById(id);
            });
        } else {
            return child.fields.map((id) => {
                return getFieldById(id);
            });
        }
    };

    const handleChildChange = (event) => {
        let child = event.target.value;
        setChild(child);
        // TODO: Using getCleaningField with component's state variables is quite ugly
        setCleaningFields(getCleaningFields(child, cleaning));
        if (child === defaultChild) {
            setChecked(cleaning.data.data.field);
        } else {
            setChecked([]);
        }
    };

    const save = () => {
        const cleaning = {
            id: params.id,
            date: date,
            child: child.id,
            field: checked,
        };
        updateMutation.mutate(cleaning);
        navigate(APP_ROUTES.CLEANINGS.LIST);
    };

    useEffect(() => {
        if (cleaning.isSuccess) {
            setDate(cleaning.data.data.date);
            if (childList.isSuccess) {
                let child = childList.data.data.find(
                    (child) => child.id === cleaning.data.data.child
                );
                setChild(child);
                setDefaultChild(child);
                setChecked(cleaning.data.data.field);
                setCleaningFields(getCleaningFields(child, cleaning));
            }
        }
    }, [cleaning.status, childList.status, defaultChild]);

    return (
        <>
            {!params.id || (cleaning.isLoading && "Loading...")}
            {cleaning.isError && cleaning.error.message}
            {childList.isSuccess &&
                childList.data &&
                cleaning.isSuccess &&
                cleaning.data && (
                    <>
                        <DatePicker
                            label="date"
                            defaultValue={dayjs(new Date(cleaning.data.data.date))}
                            onChange={(newDate) => setDate(getDateString(newDate))}
                        />
                        {childList.isLoading && <p>{"loading..."}</p>}
                        {childList.isError && <p>{childList.error.message}</p>}
                        {childList.isSuccess && childList.data && (
                            <FormControl fullWidth>
                                <InputLabel id="child-simple-select-label">Child</InputLabel>
                                <Select
                                    labelId="child-simple-select-label"
                                    id="child-simple-select"
                                    value={child ? child : ""}
                                    label="Child"
                                    onChange={handleChildChange}
                                >
                                    {childList.data.data.map((child) => {
                                        return (
                                            <MenuItem key={child.id} value={child}>
                                                {child.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        )}
                        <ChildFieldList
                            child={child}
                            cleaningFields={cleaningFields}
                            checked={checked}
                            setChecked={setChecked}
                            amountDispatch={amountDispatch}
                        />
                        <Stack direction="row" spacing={3}>
                            <Button variant="outlined" onClick={save}>
                                save
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    // TODO: Change to object with consts
                                    navigate("/cleanings");
                                }}
                            >
                                back
                            </Button>
                        </Stack>
                    </>
                )}
        </>
    );
};