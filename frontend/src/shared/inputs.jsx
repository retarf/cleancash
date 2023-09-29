import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React from "react";


export const CustomDatePicker = ({date=null, onChange}) => {

    return <DatePicker
        label="Date"
        defaultValue={dayjs(new Date(date))}
        onChange={onChange}
        format="DD-MM-YYYY"
        sx={{margin: "20px"}}
    />

}
