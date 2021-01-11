import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from "../../hoc/AuxHoc";
import Burger from "../../components/Burger/Burger";
import BuildConstrols from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get("/ingredients.json")
        // .then((response) => {
        //     this.setState({ ingredients: response.data });
        // })
        // .catch(error => {
        //     this.setState({error: true})
        // });
    }

    updatePurchasedState(ingredients) {
        const sum = Object.values(ingredients).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;


        let burger = <Spinner />

        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildConstrols
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasedState(this.props.ingredients)}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.props.totalPrice}
                />
            );
        }

        
        if (this.state.loading) {
            orderSummary = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingrName}),
        onIngredientRemoved: (ingrName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingrName}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
