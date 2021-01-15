import { Component } from "react";
import axios from "../../axios-orders";
import * as action from '../../store/acitons/index';
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
        // axios
        //     .get("/orders.json")
        //     .then((resp) => {
        //         const fetchedOrders = [];
        //         for(let key in resp.data) {
        //             fetchedOrders.push({...resp.data[key], id: key});
        //         }
        //         this.setState({ loading: false, orders: fetchedOrders });
        //     })
        //     .catch((err) => {
        //         this.setState({ loading: false });
        //     });
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = (
                <div>
                {this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))}
            </div>
            );
        }
        return (
            orders
        );
    }
}

const mapStateToProps = store => {
    return {
        orders: store.order.orders,
        loading: store.order.loading,
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(action.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));
