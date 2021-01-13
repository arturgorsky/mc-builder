import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data/");
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCheckoutContinued={this.checkoutContinuedHandler}
                        onCheckoutCancelled={this.checkoutCancelledHandler}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data/"}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary ;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

export default connect(mapStateToProps)(Checkout);
