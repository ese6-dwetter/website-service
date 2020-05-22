import styled from "styled-components";
import { AccountCircle } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

export const StyledToolbar = styled(Toolbar)`
    background-color: #0000AA;
`;
export const StyledAccountCircle = styled(AccountCircle)`
    width: 40;
    height: 50;
    color: #FFFF00;
`;
export const StyledNavLink = styled(NavLink)`
    margin-left: 10px;
    margin-right: 10px;
    text-decoration: none;
    color: #FFFFFF;
    :hover {
        color: #CCCCCC;
    }
`;
