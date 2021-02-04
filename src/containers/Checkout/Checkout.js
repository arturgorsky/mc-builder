import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {


    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace("/checkout/contact-data/");
    };

        let summary = <Redirect to="/" />;
        const purchasedRedirect = props.purchased && <Redirect to="/" />;
        if (props.ingredients) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={props.ingredients}
                        onCheckoutContinued={checkoutContinuedHandler}
                        onCheckoutCancelled={checkoutCancelledHandler}
                    />
                    <Route
                        path={props.match.path + "/contact-data/"}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary ;
    
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    };
};


export default connect(mapStateToProps)(Checkout);
