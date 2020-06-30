import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Button, Input, InputLabel, InputAdornment, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { logoutAction } from "../../redux/authentication.actions";
import { StyledForm, StyledFormControl, StyledGoogleLogin } from "./Register.styles";
import config from "../../config.json";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import RegisterUser from "../../entities/RegisterUser.entity";
import { registerPasswordFetch, registerGoogleFetch } from "../../networking/register.networking";

const Register = (props: any): JSX.Element => {
    const [username, setUsername] = React.useState('');
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
     * Register with password
     */
    const registerPassword = async (): Promise<void> => {
        // Reset error message
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

        const response = await registerPasswordFetch(user);

        // OK status code
        if (response.status === 200) {
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

    const registerGoogle = async (googleLoginResponse: any): Promise<void> => {
        // Reset error message
        setError(<div />);

        if (!googleLoginResponse.tokenId) {
            return;
        }

        const response = await registerGoogleFetch(googleLoginResponse.tokenId)

        // OK status code
        if (response.status === 200) {
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

        return;
    }

    const items = props.authenticationReducer.isAuthenticated ? (
        <Redirect to={{
            pathname: '/'
        }} />
    ) : (
        <StyledForm>
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
        </StyledForm>
    );

    return (
        <div>
            {items}
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
        logout: (): void => {
            dispatch(logoutAction());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));