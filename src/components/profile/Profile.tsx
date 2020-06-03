import React from "react";
import { login } from "../../redux/user.actions";
import User from "../../entities/User";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Profile = () =>{
    return (
        <div>Profile</div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (user: User) => {
            dispatch(login(user));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));