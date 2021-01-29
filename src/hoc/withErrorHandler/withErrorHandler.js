import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../AuxHoc";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(false);

        const requestInterceptor = axios.interceptors.request.use((req) => {
            setError(null);
            return req;
        });
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                setError(error);
                return Promise.reject(error);
            }
        );

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, [requestInterceptor, responseInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };
        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    };
};

export default withErrorHandler;
