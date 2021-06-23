const regExp = new RegExp(/(?:[01]\d|[0-9][0-9]):(?:[0-5]\d):(?:[0-5]\d)/);

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Required";
    }
    if (!values.preparation_time) {
        errors.preparation_time = "Required";
    }

    if (values.preparation_time && !regExp.test(values.preparation_time)) {
        errors.preparation_time = "Invalid data format (correct: hh:mm:ss)";
    }

    if (!values.type) {
        errors.type = "Required";
    }

    if (values.type === "pizza") {
        if (!values.no_of_slices) {
            errors.no_of_slices = "Required";
        }
        if (values.no_of_slices < 1 && values.no_of_slices !== "") {
            errors.no_of_slices = "Insert correct number";
        }
        if (!values.diameter) {
            errors.diameter = "Required";
        }
        if (values.diameter <= 0 && values.diameter !== "") {
            errors.diameter = "Insert correct number";
        }
    } else if (values.type === "soup") {
        if (!values.spiciness_scale) {
            errors.spiciness_scale = "Required";
        }
        if (values.spiciness_scale < 1 || values.spiciness_scale > 10) {
            errors.spiciness_scale = "Insert correct number (1-10)";
        }
    } else if (values.type === "sandwich") {
        if (!values.slices_of_bread) {
            errors.slices_of_bread = "Required";
        }
        if (values.slices_of_bread < 1 && values.slices_of_bread !== "") {
            errors.slices_of_bread = "Insert correct number";
        }
    }
    return errors;
};

export default validate;
