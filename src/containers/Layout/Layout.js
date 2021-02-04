import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/AuxHoc";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

        return (
            <Aux>
                <Toolbar openSideBar = {sideDrawerToggleHandler} isAuth={props.isAuthenticated}/>
                <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} isAuth={props.isAuthenticated}/>
                <main className={styles.content}>{props.children}</main>
            </Aux>
        );
    
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Layout);
