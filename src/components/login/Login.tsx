import React from "react";
import config from "../../config.json";
import { Alert } from "@material-ui/lab";
import { StyledFormControl, StyledLoginForm, StyledGoogleLogin } from "./Login.styles";
import { InputLabel, Input, InputAdornment, IconButton, Button } from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { login } from "../../redux/user.actions";
import { connect } from "react-redux";
import User from "../../entities/User";

interface LoginUser {
    email: string;
    password: string;
}

const Login = (props: any) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    
    const [error, setError] = React.useState(<div />);

    const onEmailChange = (event: any) => setEmail(event.target.value);
    const onPasswordChange = (event: any) => setPassword(event.target.value);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: any) => event?.preventDefault();

    const loginPassword = async () => {
        const user: LoginUser = {
            email: email,
            password: password
        }

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }

        // Send API call
        const response = await fetch(config.API.USER_SERVICE + "/login/password", options);
        
        // OK status code
        if (response.status === 200) {
            setError(<div/>);
            const responseUser = await response.json();
            props.login(responseUser)
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

    const loginGoogle = async (response: any) => {
        if (!response?.tokenId) {
            return;
        }

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({tokenId: response.tokenId}),
        }

        response = await fetch(config.API.USER_SERVICE + "/login/google", options);

        // OK status code
        if (response.status === 200) {
            setError(<div/>);
            const responseUser = await response.json();
            props.login(responseUser)
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

    const content = props?.user?.isAuthenticated ? (
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

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (user: User) => {
            dispatch(login(user));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
