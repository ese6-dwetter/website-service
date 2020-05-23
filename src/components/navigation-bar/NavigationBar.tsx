import React from "react";
import { StyledNavLink, StyledToolbar, StyledAccountCircle } from "./NavigationBar.styles"
import { logout } from "../../redux/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IconButton, AppBar, Menu, MenuItem} from "@material-ui/core";

const NavigationBar = (props: any): any => {
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorElement);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    }

    const handleClose = (): void => {
        setAnchorElement(null);
    }

    const logout = (): void => {
        handleClose();
        props.logout();
    }

    // Use profile 
    let items;
    if (props?.user?.isAuthenticated) {
        items = (
            <div>
                <IconButton
                    onClick={handleMenu}
                    size="small"
                >
                    <StyledAccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorElement}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem>{props.user.username}</MenuItem>
                    <MenuItem onClick={logout}>Log Out</MenuItem>
                </Menu>
            </div>
        )
    } else {
        items = (
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

    return (
        <AppBar>
            <StyledToolbar>
                <StyledNavLink  to="/">
                    Kwetter
                </StyledNavLink>
                {items}
            </StyledToolbar>
        </AppBar>
    )
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
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