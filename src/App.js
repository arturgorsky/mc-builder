import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/acitons/index";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Layout from "./containers/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Component } from "react";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/auth" component={Auth} />
                
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuth) {
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
                    <Layout>
                            {routes}
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
}

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
