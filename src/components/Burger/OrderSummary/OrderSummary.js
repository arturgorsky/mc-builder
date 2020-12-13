import React from "react";
import Aux from "../../../hoc/AuxHoc";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>
                    {igKey}: {props.ingredients[igKey]}
                </span>
            </li>
        );
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientsSummary}</ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        </Aux>
    );
};

export default orderSummary;
