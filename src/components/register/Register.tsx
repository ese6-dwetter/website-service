import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Button, Input, InputLabel, InputAdornment, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { login, logout } from "../../redux/user.actions";
import { StyledRegisterForm, StyledFormControl, StyledGoogleLogin } from "./Register.styles";
import config from "../../config.json";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import User from "../../entities/User";

interface RegisterUser {
    username: string;
    email: string;
    password: string;
}

const Register = (props: any): any => {
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

    const [error, setError] = React.useState(<div />);

    const onUsernameChange = (event: any) => setUsername(event.target.value);
    const onEmailChange = (event: any) => setEmail(event.target.value);
    const onPasswordChange = (event: any) => setPassword(event.target.value);
    const onRepeatPasswordChange = (event: any) => setRepeatPassword(event.target.value);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);
    const handleMouseDownPassword = (event: any) => event?.preventDefault();

    const validateInput = (): boolean => {
        // Check if username is too short
        if (username.length < 6) {
            setError(
                <Alert severity="error">
                    The username must be at least 6 characters long.
                </Alert>
            )

            return false;
        }

        // Check if email is too short
        if (email.length < 5) {
            setError(
                <Alert severity="error">
                    The email must be at least 5 characters long.
                </Alert>
            )

            return false;
        }

        // Check if passwords are the same
        if (password !== repeatPassword) {
            setError(
                <Alert severity="error">
                    The passwords do not match.
                </Alert>
            )

            return false;
        }

        return true;
    }

    /**
     * Check if the response status is 200
     * @param response from an API call
     */  
    const checkResponse = async (response: any) => {
        // OK status code
        if (response.status === 200) {
            setError(<div/>);
            props.history.push("/login");

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

    /**
     * Register with password
     */
    const registerPassword = async () => {
        setError(<div />);

        // Validate input
        if (!validateInput()) {   
            return;
        }
        
        // Create user JSON object
        const user: RegisterUser = {
            username: username,
            email: email,
            password: password
        };

        // Create request options
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        };

        // Send API call
        const response = await fetch(config.API.USER_SERVICE + "/register/password", options);

        checkResponse(response);

        return;
    }

    const registerGoogle = async (response: any) => {
        setError(<div />);

        if (!response?.tokenId) {
            return;
        }

        // Create request options
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({ tokenId: response.tokenId })
        }

        // Send API call
        response = await fetch(config.API.USER_SERVICE + '/register/google', options);

        checkResponse(response);

        return;
    }

    const content = props.userReducer ? (
        <Redirect to={{
            pathname: '/'
        }} />
    ) : (
        <StyledRegisterForm>
            {error}
            <h2>Register</h2>
            <StyledFormControl 
                variant="outlined"
                fullWidth={true}
            >
                <InputLabel>Username</InputLabel>
                <Input 
                    error={false}
                    required={true}
                    type="text"
                    value={username}
                    onChange={onUsernameChange}
                />
            </StyledFormControl>
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
            <StyledFormControl 
                variant="outlined"
                fullWidth={true}
            >
                <InputLabel>Repeat Password</InputLabel>
                <Input
                    error={false}
                    required={true}
                    type={showRepeatPassword ? "text" : "password"}
                    onChange={onRepeatPasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility."
                                onClick={handleClickShowRepeatPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </StyledFormControl>
            <Button 
                variant="outlined" 
                onClick={registerPassword}
            >
                Register
            </Button>
            <StyledGoogleLogin 
                clientId={config.GOOGLE.CLIENT_ID}
                buttonText="Google Register"
                onSuccess={registerGoogle}
                onFailure={registerGoogle}
            />
        </StyledRegisterForm>
    );

    return (
        <div>
            {content}
        </div>
    );
}

const mapStateToProps = (state: any) => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));