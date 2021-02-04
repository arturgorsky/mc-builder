import React, { useState } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import * as actions from "../../../store/acitons/index";
import { checkValidity } from "../../../shared/utility";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import styles from "./ContactData.module.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

const ContactData = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Name",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Street",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Zip Code",
            },
            value: "",
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Country",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "your@email.com",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [
                    { value: "fastest", displayValue: "Fastest" },
                    { value: "cheapest", displayValue: "Cheapest" },
                ],
            },
            value: "fastest",
            valid: true,
        },
    });

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElemId in orderForm) {
            formData[formElemId] = orderForm[formElemId].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice.toFixed(2),
            order: formData,
            userId: props.userId,
        };

        props.onOrderBurger(order, props.token);
    };

    const inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...orderForm,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputId],
        };

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputId] = updatedFormElement;
        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;

        let formIsValidUpdated = true;

        for (let inputId in updatedOrderForm) {
            formIsValidUpdated =
                updatedOrderForm[inputId].valid && formIsValidUpdated;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValidUpdated);
    };

    const formElementArray = [];
    for (let key in orderForm) {
        formElementArray.push({
            id: key,
            config: orderForm[key],
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementArray.map((el) => (
                <Input
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    changed={(event) => inputChangedHandler(event, el.id)}
                />
            ))}
            <div>
                <Button disabled={!formIsValid} btnType="Success">
                    ORDER
                </Button>
            </div>
        </form>
    );
    if (props.loading) {
        form = <Spinner />;
    }
    return (
        <div className={styles.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) =>
            dispatch(actions.purchaseBurger(orderData, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
