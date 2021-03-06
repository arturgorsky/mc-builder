import {useState, useEffect} from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default httpClient => {
  const [error, setError] = useState(false);

        const requestInterceptor = httpClient.interceptors.request.use((req) => {
            setError(null);
            return req;
        });
        const responseInterceptor = httpClient.interceptors.response.use(
            (response) => response,
            (error) => {
                setError(error);
                return Promise.reject(error);
            }
        );
        
        useEffect(() => {
            return () => {
                httpClient.interceptors.request.eject(requestInterceptor);
                httpClient.interceptors.response.eject(responseInterceptor);
            };
        }, [httpClient.interceptors.request, httpClient.interceptors.response, requestInterceptor, responseInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        return [error, errorConfirmedHandler];
} 