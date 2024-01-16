import {useNavigate} from "react-router-dom";
import {ChildQuery} from "../queries";
import Table from "@mui/material/Table";
import {AddButtonRow, BaseTableRow, CustomTableHead, ErrorBox, Spinner, Title} from "../../../shared";
import TableBody from "@mui/material/TableBody";
import {APP_ROUTES} from "../../../core/routes";
import React from "react";

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
                            {childList.data.data.map((child) => {
                                return (
                                    <BaseTableRow
                                        id={child.id}
                                        key={child.id}
                                        item={child}
                                        columns={columns}
                                        query={query}
                                        baseUrl={APP_ROUTES.CHILDREN.LIST}
                                    />
                                );
                            })}
                            <AddButtonRow
                                onClick={() => navigate(APP_ROUTES.CHILDREN.CREATE)}
                            />
                        </TableBody>
                    </Table>
                </>
            )}
        </>
    );
};