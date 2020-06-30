import React from "react";
import { connect } from "react-redux";
import { StyledContainer } from "./Home.styles";
import { withRouter } from "react-router-dom";
import Timeline from "../timeline/Timeline";

const Home = (props: any): JSX.Element => {
    const content = props.authenticationReducer.isAuthenticated ? (
        <StyledContainer>
            <Timeline />
        </StyledContainer>
    ) : (
        <StyledContainer>
            <h1>Welcome to Dwetter!</h1>
            <h2>A Twitter clone by Davy de Haas</h2>
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

export default withRouter(connect(mapStateToProps)(Home));