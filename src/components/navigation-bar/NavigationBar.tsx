import React, { useEffect } from "react";
import { StyledNavLink, StyledAccountCircle, StyledAppBar } from "./NavigationBar.styles"
import { logout } from "../../redux/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IconButton, Menu, MenuItem, Toolbar} from "@material-ui/core";

const NavigationBar = (props: any): any => {
    const [items, setItems] = React.useState(<div />);
    
    const updateNavigation = async () => {
        if (props.user.isAuthenticated) {
            setItems(
                <div>
                    <IconButton
                        size="medium"
                    >
                        <StyledNavLink exact to="/profile">
                            <StyledAccountCircle />
                        </StyledNavLink>
                    </IconButton>
                    <StyledNavLink exact to="/logout">
                        Log Out {props.user.username}
                    </StyledNavLink>
                </div>
            )
        } else {
            setItems(
                <div>
                    <StyledNavLink exact to="/login">
                        Log In
                    </StyledNavLink>
                    <StyledNavLink exact to="/register">
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
                    Kwetter
                </StyledNavLink>
                {items}
            </Toolbar>
        </StyledAppBar>
    )
}

const mapStateToProps = (state: any) => {
    console.log(state)
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));