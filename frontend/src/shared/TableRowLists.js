import {useNavigate} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import React, {useState} from "react";
import TableCell from "@mui/material/TableCell";
import {DeleteCell, EditableTableCell} from "./components";
import TextField from "@mui/material/TextField";

export const TableRowList = (props) => {
    const {itemList, columns, query, baseUrl} = props;
    const navigate = useNavigate();


    return (
        <>
            {itemList.map((item) => (
                <TableRow key={`row-${item.id}`}>
                    {columns.map(
                        (column) =>
                            column && (
                                <TableCell
                                    key={`cell-${item.id}-${column}`}
                                    onClick={() => navigate(baseUrl + "/" + item.id)}
                                >
                                    {item[column.toLowerCase()]}
                                </TableCell>
                            )
                    )}
                    <TableCell></TableCell>
                    <DeleteCell id={item.id} query={query}/>
                </TableRow>
            ))}
        </>
    );
};


export const EditableTableRowList = (props) => {
    const {itemList, columns, query} = props;

    return (
        <>
            {itemList.map((item) => (
                <TableRow key={`row-${item.id}`}>
                    {columns.map(
                        (column) =>
                            column && (
                                <EditableTableCell
                                    key={`cell-${item.id}-${column}`}
                                    id={item.id}
                                    name={item[column.toLowerCase()]}
                                    defaultValue={item[column.toLowerCase()]}
                                    query={query}
                                />
                            )
                    )}
                    <TableCell></TableCell>
                    <DeleteCell id={item.id} query={query}/>
                </TableRow>
            ))}
        </>
    );
};