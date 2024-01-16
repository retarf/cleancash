import {useNavigate} from "react-router-dom";
import {ChildQuery} from "../queries";
import React, {useState} from "react";
import {APP_ROUTES} from "../../../core/routes";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {EditableTitle, ErrorBox} from "../../../shared";
import {FieldsQuery} from "../../fields/queries";
import Select from "react-select"
import {useForm, Controller, SubmitHandler} from "react-hook-form"
import TextField from "@mui/material/TextField";
import FormGroup from '@mui/material/FormGroup';
import {Spinner, getIdByName} from "../../../shared";


export const AddChildForm = () => {
    const navigate = useNavigate();
    const query = ChildQuery();
    const createMutation = query.useCreate();
    const fieldsQuery = FieldsQuery();
    const fields = fieldsQuery.useList();

    const {control, handleSubmit, register, formState: {errors}} = useForm();

    const onSubmit = data => {
        data.fields = data.fields || [];
        createMutation.mutate(data);
        navigate(APP_ROUTES.CHILDREN.LIST);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => <TextField label="Name"
                                                    helperText={!!errors.name ? "This field is required." : ""}
                                                    error={!!errors.name} {...field} />}
                    rules={{required: true}}
                    defaultValue=""
                />
            </Box>
            <FormGroup sx={{margin: 3}}>
                {fields.isLoading && <Spinner/>}
                {fields.isError &&
                    <ErrorBox
                        msg={fiels.error instanceof Error && fields.error.message}
                    />
                }
                {fields.isSuccess && fields.data.data.map(cleaningFild => {
                    return (
                        <FormControlLabel
                            key={cleaningFild.id}
                            label={cleaningFild.name}
                            control={<Checkbox value={cleaningFild.id}
                                               name={cleaningFild.name} {...register("fields")} />}
                        />
                    )
                })}
            </FormGroup>
            <Stack direction="row" spacing={3}>
                <Button variant="contained" type="submit">
                    save
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate(APP_ROUTES.CHILDREN.LIST);
                    }}
                >
                    back
                </Button>
            </Stack>
        </form>
    );
};