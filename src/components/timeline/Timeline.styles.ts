import styled from "styled-components";
import { FormControl } from "@material-ui/core";
import GoogleLogin from "react-google-login";

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px auto;
    width: 500px;
    padding: 20px;
    border-radius: 20px;
    background-color: #FFFFFF
`;

export const StyledFormControl = styled(FormControl)`
    margin: 10px;
`;
