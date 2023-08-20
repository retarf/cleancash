import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import {TextButtonTableCell} from "./components";
import * as React from "react";


export const NewEditableRow = props => {
    const {} = props;


    return (
        editState && (
            <TableRow key="new">
                <TableCell>
                    <TextField
                        id="new"
                        label="name"
                        variant="outlined"
                        inputRef={nameRef}
                    />
                </TableCell>
                <TextButtonTableCell
                    text="save"
                    onClick={save}
                    disabled={createMutation.isLoading}
                />
                <TextButtonTableCell
                    text="cancel"
                    onClick={() => setEditState(false)}
                />
            </TableRow>
        )
    )
    }
