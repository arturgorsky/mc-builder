import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";

function App() {
    return (
        <BrowserRouter>
            <div>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route pathc="/checkout" component={Checkout} />
            </Switch>
            </div>
            
        </BrowserRouter>
    );
}

export default App;
