import React from "react";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {Button, FormControl, Input, InputLabel, makeStyles, createStyles} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import { login } from "../../redux/user.actions";
import { styles } from "./register.styles";

interface RegisterUser {
    username: string;
    email: string;
    password: string;
}

const Register = (props: any) => {
    // Get style classes
    const classes = makeStyles(createStyles(styles))

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordRepeat, setPasswordRepeat] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = React.useState(false);

    const [error, setError] = React.useState(<div/>);

    const onUsernameChange = (event: any) => setUsername(event.target.value);
    const onEmailChange = (event: any) => setEmail(event.target.value);
    const onPasswordChange = (event: any) => setPassword(event.target.value);
    const onPasswordRepeatChange = (event: any) => setPasswordRepeat(event.target.value);

    const handleClickShowPassword = () => setShowPassword(!setPassword);
    const handleClickShowPasswordRepeat = () => setShowPasswordRepeat(!setPasswordRepeat);

    const validateInput = (): boolean => {
        // Check if username is too short
        if (username.length < 6) {
            setError(
                <Alert severity="error">
                    The username is too short.
                </Alert>
            )

            return false;
        }

        // Check if email is too short
        if (email.length < 6) {
            setError(
                <Alert severity="error">
                    The email is too short.
                </Alert>
            )

            return false;
        }

        // Check if password is too short
        if (password.length < 8) {
            setError(
                <Alert severity="error">
                    The password is too short.
                </Alert>
            )

            return false;
        }

        // Check if passwords are the same
        if (password !== passwordRepeat) {
            setError(
                <Alert severity="error">
                    The passwords do not match.
                </Alert>
            )

            return false;
        }

        // Check email regex
        const emailRegex = /^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))\z/;
        
        if (!email.match(emailRegex)) {
            setError(
                <Alert severity="error">
                    The email is not valid
                </Alert>
            )

            return false;
        }

        // Check password regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
        
        if (!password.match(passwordRegex)) {
            setError(
                <Alert severity="error">
                    The password is not valid. Make sure the password contains atleast: 1 lower case, 1 upper case, 1 number and 1 special character.
                </Alert>
            )
            return false;
        }

        return true;
    }

    const register = async () => {
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
        const response = await fetch("config.SERVICES.USER_SERVICE", options);

        // OK status code
        if (response.status === 200) {
            setError(<div/>)
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

        return;
    }

    const content = props.auth.isAuthenticated ? (
        <Redirect to={{
            pathname: '/'
        }} />
    ) : (
        <div className="register-form">
            <FormControl variant="outlined">
                <InputLabel>Username</InputLabel>
                <Input 
                    error={false}
                    required={true}
                    type="text"
                    value={username}
                    onChange={onUsernameChange}
                />
            </FormControl>
        </div>
    );

    return (
        <div>
            {content}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (token: any) => {
            dispatch(login(token));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));