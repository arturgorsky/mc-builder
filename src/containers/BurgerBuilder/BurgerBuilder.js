import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const dispatch = useDispatch();

    const  {ingredients, totalPrice, isAuth } = useSelector((state) => {
        return {
            ingredients: state.burgerBuilder.ingredients,
            totalPrice: state.burgerBuilder.totalPrice,
            error: state.burgerBuilder.error,
            isAuth: state.auth.token,
        }
    });

    const onIngredientAdded = (ingrName) => dispatch(actions.addIngredient(ingrName));
    const onIngredientRemoved = (ingrName) => dispatch(actions.removeIngredient(ingrName));
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    const onInitIngredinets = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);

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
        if (isAuth) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push({
            pathname: "/checkout",
        });
    };

    const disabledInfo = {
        ...ingredients,
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;

    if (ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildConstrols
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchasedState(ingredients)}
                    price={totalPrice}
                    ordered={purchaseHandler}
                    isAuth={isAuth}
                />
            </Aux>
        );

        orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                totalPrice={totalPrice}
            />
        );
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

export default withErrorHandler(BurgerBuilder, axios);
