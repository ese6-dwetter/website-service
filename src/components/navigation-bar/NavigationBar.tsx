import React, { useEffect } from "react";
import { StyledNavLink, StyledAccountCircle, StyledAppBar } from "./NavigationBar.styles"
import { logoutAction } from "../../redux/authentication.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IconButton, Toolbar} from "@material-ui/core";

const NavigationBar = (props: any): JSX.Element => {
    const [items, setItems] = React.useState(<div />);
    
    const updateNavigation = async (): Promise<void> => {
        if (props.authenticationReducer.isAuthenticated) {
            setItems(
                <div>
                    <IconButton
                        size="medium"
                    >
                        <StyledNavLink to="/profile">
                            <StyledAccountCircle />
                        </StyledNavLink>
                    </IconButton>
                    <StyledNavLink to="/logout">
                        Log Out {props.authenticationReducer.user.username}
                    </StyledNavLink>
                </div>
            )
        } else {
            setItems(
                <div>
                    <StyledNavLink to="/login">
                        Log In
                    </StyledNavLink>
                    <StyledNavLink to="/register">
                        Register
                    </StyledNavLink>
                </div>
            )
        }
    }

    useEffect(() => {
        updateNavigation();
    }, [props]);

    return (
        <StyledAppBar>
            <Toolbar>
                <StyledNavLink  to="/">
                    Dwetter
                </StyledNavLink>
                {items}
            </Toolbar>
        </StyledAppBar>
    )
}

const mapStateToProps = (state: any): any => {
    return {
        authenticationReducer: state.authenticationReducer
    }
}

const mapDispatchToProps = (dispatch: any): any => {
    return {
        logout: (): void => {
            dispatch(logoutAction());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));