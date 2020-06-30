import React from "react";
import config from "../../config.json";
import { Alert } from "@material-ui/lab";
import { StyledFormControl, StyledLoginForm, StyledGoogleLogin } from "./Login.styles";
import { InputLabel, Input, InputAdornment, IconButton, Button } from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { loginAction } from "../../redux/authentication.actions";
import { connect } from "react-redux";
import User from "../../entities/User.entity";
import LoginUser from "../../entities/LoginUser.entity";
import { loginGoogleFetch, loginPasswordFetch } from "../../networking/login.networking";

const Login = (props: any): JSX.Element => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    
    const [error, setError] = React.useState(<div />);

    const onEmailChange = (event: any): void => setEmail(event?.target.value);
    const onPasswordChange = (event: any): void => setPassword(event?.target.value);

    const handleClickShowPassword = (): void => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: any): void => event?.preventDefault();

    const loginPassword = async (): Promise<void> => {
        // Reset error message
        setError(<div />);

        const user: LoginUser = {
            email: email,
            password: password
        }

        const response = await loginPasswordFetch(user)
        
        // OK status code
        if (response.status === 200) {
            const responseUser: User = await response.json();
            props.login(responseUser);
            props.history.push("/");

            return;
        }

        // Get error message from response
        const errorMessage = await response.text();

        setError(
            <Alert severity="error">
                {errorMessage}
            </Alert>
        );
    }

    const loginGoogle = async (googleLoginResponse: any): Promise<void> => {
        // Reset error message
        setError(<div />);

        if (!googleLoginResponse.tokenId) {
            return;
        }

        const response = await loginGoogleFetch(googleLoginResponse.tokenId);

        // OK status code
        if (response.status === 200) {
            const responseUser: User = await response.json();
            props.login(responseUser);
            props.history.push("/");

            return;
        }

        // Get error message from response
        const errorMessage = await response.text();

        setError(
            <Alert severity="error">
                {errorMessage}
            </Alert>
        );
    }

    const content = props.authenticationReducer.isAuthenticated ? (
        <Redirect to={{
            pathname: '/'
        }} />
    ) : (
        <StyledLoginForm>
            {error}
            <h2>Log in</h2>
            <StyledFormControl 
                variant="outlined"
                fullWidth={true}
            >
                <InputLabel>Email</InputLabel>
                <Input 
                    error={false}
                    required={true}
                    type="text"
                    value={email}
                    onChange={onEmailChange}
                />
            </StyledFormControl>
            <StyledFormControl 
                variant="outlined"
                fullWidth={true}
            >
                <InputLabel>Password</InputLabel>
                <Input
                    error={false}
                    required={true}
                    type={showPassword ? "text" : "password"}
                    onChange={onPasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility."
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </StyledFormControl>
            <Button 
                variant="outlined" 
                onClick={loginPassword}
            >
                Login
            </Button>
            <StyledGoogleLogin
                clientId={config.GOOGLE.CLIENT_ID}
                buttonText="Google Login"
                onSuccess={loginGoogle}
                onFailure={loginGoogle}
            />
        </StyledLoginForm>
    );

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
