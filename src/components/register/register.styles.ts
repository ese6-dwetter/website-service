import styled from "styled-components";
import { FormControl } from "@material-ui/core";

export const StyledRegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EEEEEE;
    margin: 100px;
    padding: 20px;
    border-radius: 20px;
`;

export const StyledFormControl = styled(FormControl)`
    margin: 10px;
`;