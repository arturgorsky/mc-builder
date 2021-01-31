import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/acitons/index";
import axios from "../../axios-orders";
import Aux from "../../hoc/AuxHoc";
import Burger from "../../components/Burger/Burger";
import BuildConstrols from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);
    const { onInitIngredinets } = props;

    useEffect(() => {
        onInitIngredinets();
    }, [onInitIngredinets]);

    const updatePurchasedState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuth) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push({
            pathname: "/checkout",
        });
    };

    const disabledInfo = {
        ...props.ingredients,
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;

    if (props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients} />
                <BuildConstrols
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchasedState(
                        props.ingredients
                    )}
                    price={props.totalPrice}
                    ordered={purchaseHandler}
                    isAuth={props.isAuth}
                />
            </Aux>
        );

        orderSummary = (
            <OrderSummary
                ingredients={props.ingredients}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                totalPrice={props.totalPrice}
            />
        );
    }

    return (
        <Aux>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingrName) =>
            dispatch(actions.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) =>
            dispatch(actions.removeIngredient(ingrName)),
        onInitIngredinets: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>
            dispatch(actions.setAuthRedirectPath(path)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
