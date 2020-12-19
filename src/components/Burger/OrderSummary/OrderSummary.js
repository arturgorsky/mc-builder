import React, { Component } from "react";
import Aux from "../../../hoc/AuxHoc";
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map((igKey) => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>
                        {igKey}: {this.props.ingredients[igKey]}
                    </span>
                </li>
            );
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientsSummary}</ul>
                <p>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            </Aux>
        );
    }
    
};

export default OrderSummary;
