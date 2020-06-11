import React from "react";
import { loginAction } from "../../redux/authentication.actions";
import User from "../../entities/User.entity";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { StyledContainer } from "./Profile.styles";

const Profile = (props: any): JSX.Element =>{
    const content = (
        <StyledContainer>
            <h1>{props.authenticationReducer.user.username}</h1>
            <p>id: {props.authenticationReducer.user.id}</p>
            <p>email: {props.authenticationReducer.user.email}</p>
        </StyledContainer>
    )

    return (
        <div>
            {content}
        </div>
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