import { BrowserRouter, Switch, Route } from "react-router-dom";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';
import Layout from "./containers/Layout/Layout";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                    </Switch>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
