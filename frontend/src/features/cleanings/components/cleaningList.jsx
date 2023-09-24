import {useNavigate} from "react-router-dom";
import {CleaningQuery} from "../queries";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {APP_ROUTES} from "../../../core/routes";
import {AddButtonRow, CustomTableHead, ErrorBox, findNameById, findValueById, Spinner} from "../../../shared";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {DeleteButtonCell} from "../../../shared/TableCell";
import {ChildQuery} from "../../children/queries";
import {FieldsQuery} from "../../fields/queries";
import {SalaryQuery} from "../../salary/queries";
import { Title } from "/app/src/shared";

export const CleaningList = () => {
    const navigate = useNavigate();
    const childQuery = ChildQuery();
    const childList = childQuery.useList();
    const fieldsQuery = FieldsQuery();
    const fieldList = fieldsQuery.useList();
    const salaryQuery = SalaryQuery();
    const salaryList = salaryQuery.useList();
    const query = CleaningQuery();
    const cleaningList = query.useList();
    const columns = ["Date", "Child", "Fields", "Salary", "Amount", ""];

    return (
        <React.Fragment>
            <Title>Cleanings List</Title>
            {cleaningList.isLoading &&
                childList.isLoading &&
                fieldList.isLoading &&
                salaryList.isLoading && <Spinner/>}
            {cleaningList.isError && (
                <ErrorBox
                    msg={
                        cleaningList.error instanceof Error && cleaningList.error.message
                    }
                />
            )}
            {childList.isError && (
                <ErrorBox
                    msg={childList.error instanceof Error && childList.error.message}
                />
            )}
            {fieldList.isError && (
                <ErrorBox
                    msg={fieldList.error instanceof Error && fieldList.error.message}
                />
            )}
            {salaryList.isError && (
                <ErrorBox
                    msg={salaryList.error instanceof Error && salaryList.error.message}
                />
            )}
            {cleaningList.isSuccess &&
                cleaningList.data &&
                childList.isSuccess &&
                childList.data &&
                fieldList.isSuccess &&
                fieldList.data &&
                salaryList.isSuccess &&
                salaryList.data && (
                    <Table size="small">
                        <CustomTableHead key="header" columns={columns}/>
                        <TableBody>
                            {cleaningList.data.data.map((cleaning, idx) => {
                                return (
                                    <CleaningTableRow
                                        key={idx}
                                        item={cleaning}
                                        query={query}
                                        baseUrl={APP_ROUTES.CLEANINGS.LIST}
                                    />
                                );
                            })}
                            <AddButtonRow
                                key="Add"
                                name="Add"
                                onClick={() => navigate(APP_ROUTES.CLEANINGS.CREATE)}
                                rows={6}
                            />
                        </TableBody>
                    </Table>
                )}
        </React.Fragment>
    );
};
const CleaningTableRow = (props) => {
    const {item, query, baseUrl} = props;
    const navigate = useNavigate();
    const childQuery = ChildQuery();
    const childList = childQuery.useList();
    const fieldsQuery = FieldsQuery();
    const fieldList = fieldsQuery.useList();
    const salaryQuery = SalaryQuery();
    const salaryList = salaryQuery.useList();
    const deleteMutation = query.useDelete(item.id);

    const onDeleteHandler = (event) => {
        event.stopPropagation();
        deleteMutation.mutate();
    };

    return (
        <TableRow
            key={item.id}
            name={item.bill}
            arial-label={item.bill}
            hover={true}
            onClick={() => {
                navigate(`${baseUrl}/${item.id}`);
            }}
        >
            <TableCell>{item.date}</TableCell>
            <TableCell>{findNameById(childList.data.data, item.child)}</TableCell>
            <TableCell>
                <ul>
                    {item.field.map((fieldId, idx) => {
                        return (
                            <li key={`field-${idx}`}>
                                {findNameById(fieldList.data.data, fieldId)}
                            </li>
                        );
                    })}
                </ul>
            </TableCell>
            <TableCell>{findValueById(salaryList.data.data, item.salary)}</TableCell>
            <TableCell>{item.bill}</TableCell>
            <DeleteButtonCell onClick={(event) => onDeleteHandler(event)}/>
        </TableRow>
    );
};