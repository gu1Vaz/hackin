import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '../layout/auth';
import DefaultLayout from '../layout/default';
export default function RouteWrapper({
    component: Component,
    isPrivate,
    isPrivateAndPublic,
    ...rest
}) {
    var type = localStorage.getItem('type')>0;
    const signed = localStorage.getItem('id') > 0;

    if (!signed && isPrivate) {
        return <Redirect to="login" />;
    }
    if (signed && !isPrivate) {
        if(isPrivateAndPublic){

        }else{
            return <Redirect to="/" />;
        }
    }
    
    
    const Layout = type ? DefaultLayout : AuthLayout;
    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}
RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    isPrivateAndPublic : PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
RouteWrapper.defaultProps = {
    isPrivate: false,
};