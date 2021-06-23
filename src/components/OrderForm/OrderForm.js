import React, { useState } from "react";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Paper, Grid, Button, Typography } from "@material-ui/core";
import formFields from "./formFields";
import validate from "./validate";

const OrderForm = () => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const clearNotifications = () => {
        setSuccess(null);
        setError(null);
    };

    const onSubmit = async (values) => {
        await fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    setError("Submission failed.");
                    data.errors.forEach((err) => console.log(err.message));
                    return { [FORM_ERROR]: "Submission failed." };
                } else {
                    setSuccess(
                        "Congratulations! Your order has been submitted."
                    );
                    console.log(data); // preview of response data (for development purposes only)
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
            <Form
                onSubmit={onSubmit}
                initialValues={{}}
                validate={validate} // validate function is imported from ./validate.js
                render={({ handleSubmit, submitting, values, form }) => {
                    return (
                        <form
                            onSubmit={async (...args) => {
                                clearNotifications();
                                const formError = await handleSubmit(...args);
                                const validationError = validate(values);
                                if (formError) {
                                    return;
                                }
                                if (
                                    !formError &&
                                    Object.keys(validationError).length === 0
                                ) {
                                    form.restart();
                                }
                            }}
                            noValidate
                        >
                            <Paper
                                style={{
                                    paddingTop: 24,
                                    paddingRight: 16,
                                    paddingBottom: 24,
                                    paddingLeft: 16,
                                }}
                            >
                                <Grid
                                    container
                                    item
                                    justify="center"
                                    style={{
                                        marginBottom: 20,
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        color="textPrimary"
                                    >
                                        Insert your order
                                    </Typography>
                                </Grid>
                                <Grid
                                    container
                                    alignItems="flex-start"
                                    spacing={2}
                                >
                                    {formFields // formFields array is imported from ./formFields.js
                                        .filter(
                                            (item) =>
                                                item.dependsOn ===
                                                    values.type ||
                                                item.dependsOn === null
                                        )
                                        .map((item, index) => (
                                            <Grid
                                                item
                                                xs={item.size}
                                                key={index}
                                            >
                                                {item.field}
                                            </Grid>
                                        ))}

                                    <Grid
                                        container
                                        item={error || success ? true : null}
                                        justify="center"
                                        style={
                                            error || success
                                                ? {
                                                      marginTop: 24,
                                                  }
                                                : {}
                                        }
                                    >
                                        {error && (
                                            <Typography
                                                variant="body1"
                                                color="error"
                                            >
                                                {error}
                                            </Typography>
                                        )}
                                        {success && (
                                            <Typography
                                                variant="body1"
                                                className="success"
                                            >
                                                {success}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid
                                        item
                                        style={{
                                            marginTop: 24,
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            {!submitting
                                                ? "Submit"
                                                : "Submitting..."}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export default OrderForm;
