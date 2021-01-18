import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios
            .post(`/orders.json?auth=${token}`, orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data, orderData));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFail(err));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT,
    };
};

export const fetchOrders = (token) => {
    return (dispatch) => {
        dispatch(fetchOrdersInit());
        axios
            .get(`/orders.json?auth=${token}`)
            .then((resp) => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({ ...resp.data[key], id: key });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch((err) => {
                dispatch(fetchOrdersFail(err));
            });
    };
};
