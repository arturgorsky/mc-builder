import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/acitons/index";


import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./containers/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import React, { useEffect, Suspense } from "react";

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});



const App = (props) => {
    const trySingup = props.onTryAutoSignup;
    useEffect(() => {
        trySingup();
    }, [trySingup]);

    let routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" component={Auth} />

            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <BrowserRouter>
            <div>
                <Layout><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Layout>
            </div>
        </BrowserRouter>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
    };
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
