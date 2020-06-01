import styled from "styled-components";
import { FormControl } from "@material-ui/core";
import GoogleLogin from "react-google-login";

export const StyledRegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 100px;
    padding: 20px;
    border-radius: 20px;
    background-color: #EEEEEE
`;

export const StyledFormControl = styled(FormControl)`
    margin: 10px;
`;

export const StyledGoogleLogin = styled(GoogleLogin)`
    margin: 10px;
`