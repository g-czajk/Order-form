import React from "react";
import { TextField, Select } from "mui-rff";
import formatString from "format-string-by-pattern";
import { MenuItem } from "@material-ui/core";

const convertToFloat = (num, decPlaces) => {
    return parseFloat(parseFloat(num).toFixed(decPlaces));
};

const formFields = [
    {
        size: 6,
        field: (
            <TextField
                label="Dish name"
                name="name"
                margin="none"
                required={true}
            />
        ),
        dependsOn: null,
    },
    {
        size: 6,
        field: (
            <TextField
                label="Preparation time (hh:mm:ss)"
                name="preparation_time"
                margin="none"
                required={true}
                fieldProps={{
                    parse: (values) =>
                        formatString("HH:MM:SS", values.replace(/[^\d]/g, "")),
                }}
            />
        ),
        dependsOn: null,
    },
    {
        size: 4,
        field: (
            <Select
                name="type"
                label="Select dish type"
                formControlProps={{ margin: "none" }}
            >
                <MenuItem value="pizza">Pizza</MenuItem>
                <MenuItem value="soup">Soup</MenuItem>
                <MenuItem value="sandwich">Sandwich</MenuItem>
            </Select>
        ),
        dependsOn: null,
    },
    {
        size: 4,
        field: (
            <TextField
                label="No. of slices"
                name="no_of_slices"
                margin="none"
                type="number"
                required={true}
                InputProps={{
                    inputProps: {
                        min: 1,
                    },
                }}
                fieldProps={{
                    parse: (values) => {
                        if (values !== "") {
                            return parseInt(values);
                        } else return undefined;
                    },
                }}
            />
        ),
        dependsOn: "pizza",
    },
    {
        size: 4,
        field: (
            <TextField
                label="Diameter"
                name="diameter"
                margin="none"
                type="number"
                InputProps={{
                    inputProps: {
                        step: 0.1,
                    },
                }}
                fieldProps={{
                    parse: (values) => {
                        if (values !== "") {
                            return convertToFloat(values, 2);
                        } else return undefined;
                    },
                }}
                required={true}
            />
        ),
        dependsOn: "pizza",
    },
    {
        size: 8,
        field: (
            <TextField
                label="Spiciness scale (1-10)"
                name="spiciness_scale"
                margin="none"
                type="number"
                InputProps={{
                    inputProps: {
                        min: 1,
                        max: 10,
                    },
                }}
                fieldProps={{
                    parse: (values) => {
                        if (values !== "") {
                            return parseInt(values);
                        } else return undefined;
                    },
                }}
                required={true}
            />
        ),
        dependsOn: "soup",
    },
    {
        size: 8,
        field: (
            <TextField
                label="Slices of bread"
                name="slices_of_bread"
                margin="none"
                type="number"
                required={true}
                fieldProps={{
                    parse: (values) => {
                        if (values !== "") {
                            return parseInt(values);
                        } else return undefined;
                    },
                }}
            />
        ),
        dependsOn: "sandwich",
    },
];

export default formFields;
