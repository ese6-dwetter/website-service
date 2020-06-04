import React from "react";
import { loginAction } from "../../redux/authentication.actions";
import User from "../../entities/User.entity";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Profile = (): JSX.Element =>{
    return (
        <div>Profile</div>
    );
}

const mapStateToProps = (state: any): any => {
    return {
        authenticationReducer: state.authenticationReducer
    }
}

const mapDispatchToProps = (dispatch: any): any => {
    return {
        login: (user: User): void => {
            dispatch(loginAction(user));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));