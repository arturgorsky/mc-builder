import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import * as actions from '../../../store/acitons/index';

class Logout extends Component {

    componentWillMount() {
        this.props.onLogout();
    }

    componentDidMount() {
        
    }

    render () {
        return (
            <Redirect to="/" />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);