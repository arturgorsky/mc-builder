import { useEffect } from "react";
import axios from "../../axios-orders";
import * as action from "../../store/acitons/index";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
    const onFetchOrders = props.onFetchOrders;
    const {token, userId} = props;
    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);

    let orders = <Spinner />;
    if (!props.loading) {
        orders = (
            <div>
                {props.orders.map((order) => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
    return orders;
};

const mapStateToProps = (store) => {
    return {
        orders: store.order.orders,
        loading: store.order.loading,
        token: store.auth.token,
        userId: store.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) =>
            dispatch(action.fetchOrders(token, userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
