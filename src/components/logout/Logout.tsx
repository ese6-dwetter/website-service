import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { logout } from "../../redux/user.actions";
import { connect } from "react-redux";

const Logout = (props: any) => {
    props.logout()

    return (
        <Redirect to={{
            pathname: "/login"
        }} />
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.userReducer.user
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));