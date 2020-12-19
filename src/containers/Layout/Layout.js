import React, { Component } from "react";

import Aux from "../../hoc/AuxHoc";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer};
        }); 
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    render() {
        return (
            <Aux>
                <Toolbar openSideBar = {this.sideDrawerToggleHandler} />
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
                <main className={styles.content}>{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;
