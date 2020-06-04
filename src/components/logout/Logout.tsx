import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { logoutAction } from "../../redux/authentication.actions";
import { connect } from "react-redux";

const Logout = (props: any): JSX.Element => {
    props.logout()

    return (
        <Redirect to={{
            pathname: "/login"
        }} />
    );
}

const mapStateToProps = (state: any): any => {
    return {
        authenticationReducer: state.authenticationReducer
    };
}

const mapDispatchToProps = (dispatch: any): any => {
    return {
        logout: (): void => {
            dispatch(logoutAction());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));