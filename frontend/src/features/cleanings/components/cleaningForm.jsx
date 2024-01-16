import {useNavigate} from "react-router-dom";
import {CleaningQuery} from "../queries";
import React, {useReducer, useState} from "react";
import {CustomDatePicker, ErrorBox, findItemById, getDateString, SelectMenu, Spinner} from "../../../shared";
import {APP_ROUTES} from "../../../core/routes";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {ChildFieldList} from "./childFieldList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {ChildQuery} from "../../children/queries";
import {SalaryQuery} from "../../salary/queries";
import {FieldsQuery} from "../../fields/queries";
import {AmountReducer} from "../reducers";

export const CleaningForm = () => {
    const navigate = useNavigate();
    const query = CleaningQuery();
    const createMutation = query.useCreate();
    const childQuery = ChildQuery();
    const childList = childQuery.useList();
    const salaryQuery = SalaryQuery();
    const salaryList = salaryQuery.useList();
    const [date, setDate] = useState(getDateString(new Date()));
    const [child, setChild] = useState();
    const fieldQuery = FieldsQuery();
    const fields = fieldQuery.useList();
    const [checked, setChecked] = useState([]);
    const [cleaningFields, setCleaningFields] = useState([]);
    const [salary, setSalary] = useState(0);
    const [fieldValue, setFieldValue] = useState();

    const [amount, amountDispatch] = useReducer(AmountReducer, {
        child: undefined,
        salary: undefined,
        checked: [],
        sum: 0,
    });

    const getCleaningFields = (child) => {
        return child.fields.map((id) => {
            return findItemById(fields.data.data, id);
        });
    };

    const handleChildChange = (event) => {
        let child = event.target.value;
        setChild(child);
        setChecked([]);
        setCleaningFields(getCleaningFields(child));
        amountDispatch({type: "setChild", child: child});
    };

    const handleSalaryChange = (event) => {
        let salary = event.target.value;
        setSalary(salary);
        amountDispatch({type: "setSalary", salary: salary});
    };

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
        amountDispatch({type: "setChecked", checked: checked});
    };

    const save = () => {
        const cleaning = {
            date: date,
            child: child.id,
            field: checked,
            salary: salary.id,
            bill: amount.sum,
        };
        createMutation.mutate(cleaning);
        navigate(APP_ROUTES.CLEANINGS.LIST);
    };

    return (
        <>
            {childList.isLoading && salaryList.isLoading && <Spinner/>}
            {childList.isError && (
                <ErrorBox
                    msg={childList.error instanceof Error && childList.error.message}
                />
            )}
            {salaryList.isError && (
                <ErrorBox
                    msg={salaryList.error instanceof Error && salaryList.error.message}
                />
            )}
            {childList.isSuccess && childList.data && (
                <>
                    <CustomDatePicker
                        date={dayjs(date)}
                        onChange={(newDate) => setDate(getDateString(newDate))}
                    />
                    <SelectMenu
                        label="Child"
                        itemList={childList.data.data}
                        item={child}
                        onChangeHandler={handleChildChange}
                        fieldName="name"
                    />
                </>
            )}
            <ChildFieldList
                cleaningFields={cleaningFields}
                checked={checked}
                setChecked={setChecked}
                amountDispatch={amountDispatch}
            />
            {salaryList.isSuccess && salaryList.data && (
                <SelectMenu
                    label="Salary"
                    itemList={salaryList.data.data}
                    item={salary}
                    onChangeHandler={handleSalaryChange}
                    fieldName="value"
                />
            )}
            <h3>{amount.sum}</h3>
            <Stack direction="row" spacing={3}>
                <Button variant="outlined" onClick={save}>
                    save
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate("/cleanings");
                    }}
                >
                    back
                </Button>
            </Stack>
        </>
    );
};