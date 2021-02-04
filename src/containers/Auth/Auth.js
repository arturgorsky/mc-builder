import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../shared/utility";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/acitons/index";
import styles from "./Auth.module.css";

const Auth = (props) => {
    const [controls, setControls] = useState({
        
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "your@email.com",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        
    });
    const [isSignUp, setIsSignUp] = useState(true);


    useEffect(() => {
        if(!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, [props]);


    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: !checkValidity(
                    event.target.value,
                    controls[controlName].validation
                ),
                touched: true,
            },
        };

        setControls(updatedControls);
    };

    

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignUp
        );
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };


        const formElementArray = [];
        for (let key in controls) {
            formElementArray.push({
                id: key,
                config: controls[key],
            });
        }

        let form = formElementArray.map((formEl) => (
            <Input
                key={formEl.id}
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                invalid={formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
                changed={(event) => inputChangedHandler(event, formEl.id)}
            />
        ));

        if(props.loading) {
            form = <Spinner />
        }

        let errorMessge = null;

        if(props.error) {
            errorMessge = (
                <p>
                    {props.error.message}
                </p>
            );
        }

        let authRedirect = null;

        if(props.isAuth) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessge}
                <form onSubmit={(event) => submitHandler(event)}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={() => switchAuthModeHandler()} btnType="Danger">
                    SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
                </Button>
            </div>
        );
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
