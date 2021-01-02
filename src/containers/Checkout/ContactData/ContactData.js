import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./ContactData.module.css";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: "Thomas Tankengine",
                address: {
                    street: "Teststreet 1",
                    zipCode: "4351",
                    country: "Poland",
                },
                email: "test@gmail.com",
            },
            deliveryMethod: "uberfast",
        };

        axios
            .post("/orders.json", order)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({ loading: false });
            });

        
    };

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="your@email.com" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Zip Code" />
                <div>
                    <Button clicked={this.orderHandler} btnType="Success">
                        ORDER
                    </Button>
                </div>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
