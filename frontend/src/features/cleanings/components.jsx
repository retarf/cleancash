import React, { useState, useEffect, useReducer } from "react";
import { Title, getDateString } from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { CleaningQuery } from "./queries";
import { FieldsQuery } from "/app/src/features/fields/queries";
import { ChildQuery } from "/app/src/features/children/queries";
import { SalaryQuery } from "/app/src/features/salary/queries";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { DeleteCell } from "/app/src/shared";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  CustomTableHead,
  ErrorBox,
  Spinner,
  SelectMenu,
  findNameById,
} from "/app/src/shared";
import { findItemById } from "../../shared";

export const Cleaning = ({ cleaningId, setCleaningId }) => {
  switch (cleaningId) {
    case -1:
      return <CleaningList setCleaningId={setCleaningId} />;
      break;
    case 0:
      return (
        <CleaningForm cleaningId={cleaningId} setCleaningId={setCleaningId} />
      );
      break;
    default:
      return (
        <CleaningEdit cleaningId={cleaningId} setCleaningId={setCleaningId} />
      );
  }
};

const CleaningList = ({ setCleaningId }) => {
  const childQuery = ChildQuery();
  const childList = childQuery.useList();
  const fieldsQuery = FieldsQuery();
  const fieldList = fieldsQuery.useList();
  const query = CleaningQuery();
  const cleaningList = query.useList();
  const columns = ["Date", "Child", "Fields", "Salary", "Amount", ""];

  return (
    <React.Fragment>
      <Title>Cleanings List</Title>
      {cleaningList.isLoading && childList.isLoading && fieldList.isLoading && (
        <Spinner />
      )}
      {cleaningList.isError && <ErrorBox msg={cleaningList.error.message} />}
      {childList.isError && <ErrorBox msg={childList.error.message} />}
      {fieldList.isError && <ErrorBox msg={fieldList.error.message} />}
      {cleaningList.isSuccess &&
        cleaningList.data &&
        childList.isSuccess &&
        childList.data &&
        fieldList.isSuccess &&
        fieldList.data && (
          <>
            <Table size="small">
              <CustomTableHead columns={columns} />
              <TableBody>
                {cleaningList.data.data.map((cleaning) => {
                  return (
                    <TableRow
                      key={cleaning.id}
                      hover={true}
                      onClick={() => {
                        setCleaningId(cleaning.id);
                      }}
                    >
                      <TableCell>{cleaning.date}</TableCell>
                      <TableCell>
                        {findNameById(childList.data.data, cleaning.child)}
                      </TableCell>
                      <TableCell>
                        <ul>
                          {cleaning.field.map((fieldId) => {
                            return (
                              <li key={fieldId}>
                                {findNameById(fieldList.data.data, fieldId)}
                              </li>
                            );
                          })}
                        </ul>
                      </TableCell>
                      <TableCell>{cleaning.salary}</TableCell>
                      <TableCell>{cleaning.bill}</TableCell>
                      <DeleteCell id={cleaning.id} query={query} />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <IconButton onClick={() => setCleaningId(0)} aria-label="add">
              <AddIcon />
            </IconButton>
          </>
        )}
    </React.Fragment>
  );
};

const AmountReducer = (state, action) => {
  let child = state.child;
  let salary = state.salary;
  let checked = state.checked;
  let sum = 0;
  switch (action.type) {
    case "setChild": {
      child = action.child;
      break;
    }
    case "setSalary": {
      salary = action.salary;
      break;
    }
    case "setChecked": {
      checked = action.checked;
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
  if (child !== undefined && salary !== undefined) {
    let fieldValue = (salary.value / child.fields.length).toFixed(2);
    sum = fieldValue * checked.length;
  }
  return {
    child: child,
    salary: salary,
    checked: checked,
    sum: sum,
  };
};

const CleaningForm = ({ setCleaningId }) => {
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
    amountDispatch({ type: "setChild", child: child });
  };

  const handleSalaryChange = (event) => {
    let salary = event.target.value;
    setSalary(salary);
    amountDispatch({ type: "setSalary", salary: salary });
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
    amountDispatch({ type: "setChecked", checked: checked });
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
    setCleaningId(-1);
  };

  return (
    <>
      {childList.isLoading && salaryList.isLoading && <Spinner />}
      {childList.isError && <ErrorBox msg={childList.error.message} />}
      {childList.isError && <ErrorBox msg={salaryList.error.message} />}
      {childList.isSuccess && childList.data && (
        <>
          <DatePicker
            label="date"
            defaultValue={dayjs(date)}
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
            setCleaningId(-1);
          }}
        >
          back
        </Button>
      </Stack>
    </>
  );
};
const ChildFieldList = ({
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
    amountDispatch({ type: "setChecked", checked: newChecked });
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
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
                    inputProps={{ "aria-labelledby": labelId }}
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

const FieldList = ({ childFields, checked, setChecked }) => {
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

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {childFields ? (
        childFields.map((field) => {
          const labelId = `checkbox-list-label-${field.id}`;
          return (
            <ListItem key={field.id} disablePadding>
              <FormControlLabel
                control={
                  <Checkbox
                    id={labelId}
                    checked={checked.includes(field.id)}
                    tabIndex={field.id}
                    inputProps={{ "aria-labelledby": labelId }}
                    onChange={handleToggle}
                  />
                }
                label={field.name}
              />
            </ListItem>
          );
        })
      ) : (
        <ListItem>Loading...</ListItem>
      )}
    </List>
  );
};

const CleaningEdit = ({ cleaningId, setCleaningId }) => {
  const query = CleaningQuery();
  const cleaning = query.useRead(cleaningId);
  const updateMutation = query.useUpdate(cleaningId);
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
      id: cleaningId,
      date: date,
      child: child.id,
      field: checked,
    };
    updateMutation.mutate(cleaning);
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
      {!cleaningId || (cleaning.isLoading && "Loading...")}
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
            />
            <Stack direction="row" spacing={3}>
              <Button variant="outlined" onClick={save}>
                save
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  // TODO: Change to object with consts
                  setCleaningId(-1);
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
