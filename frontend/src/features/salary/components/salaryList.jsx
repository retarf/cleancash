import React, {useState, useRef} from "react";
import {Title} from "/app/src/shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import {SalaryQuery} from "../queries";

import {
    CustomTableHead,
    EditableTableRow,
    ErrorBox,
    Spinner,
    NewData
} from "../../../shared";

function SalaryList(props) {
    const query = SalaryQuery();
    const salaryList = query.useList();
    const columns = ["Value", "", ""];
    const [blockedState, setBlockedState] = useState(false);

    const rules = {
        required: true,
        pattern: {
            value: /^\d+$|^\d+\.\d{1,2}$/,
            message: 'Please enter a number with less than two decimals.',
        }
    }

    return (
        <React.Fragment>
            <Title>Salary List</Title>
            {salaryList.isError && (
                <ErrorBox
                    msg={salaryList.error instanceof Error && salaryList.error.message}
                />
            )}
            {salaryList.isLoading && <Spinner/>}
            {salaryList.isSuccess && salaryList.data && (
                <>
                    <Table size="small">
                        <CustomTableHead columns={columns}/>
                        <TableBody>
                            {salaryList.data.data.map((salary) => {
                                return (
                                    <EditableTableRow
                                        key={salary.id}
                                        item={salary}
                                        name="salary"
                                        valueName="value"
                                        query={query}
                                        blockedState={blockedState}
                                        setBlockedState={setBlockedState}
                                        rules={rules}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                    <NewData
                        name="salary"
                        valueName="value"
                        query={query}
                        blockedState={blockedState}
                        setBlockedState={setBlockedState}
                        rules={rules}
                    />
                </>
            )}
        </React.Fragment>
    );
}

export default SalaryList;
