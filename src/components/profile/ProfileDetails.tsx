import React, { useEffect } from "react";
import { loginAction } from "../../redux/authentication.actions";
import User from "../../entities/User.entity";
import { withRouter, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { StyledContainer } from "./ProfileDetails.styles";
import { profileFetch } from "../../networking/profile.networking";
import { Alert } from "@material-ui/lab";
import Profile from "../../entities/Profile.entity";

const ProfileDetails = (props: any): JSX.Element => {
    const {id} = useParams();

    const [profile, setProfile] = React.useState(<div />);
    const [error, setError] = React.useState(<div />);

    const getProfile = async (id: string): Promise<Profile> => {
        setError(<div />);

        const response = await profileFetch(id);
        
        // OK status code
        if (response.status === 200) {
            const profile: Profile = await response.json();
            
            return profile;
        }

        // Get error message from response
        const errorMessage = await response.text();

        setError(
            <Alert severity="error">
                {errorMessage}
            </Alert>
        );
        
        throw new Error(errorMessage)
    }

    useEffect(() => {
        (async (): Promise<void> => {
            if (id) {
                const profile: Profile = await getProfile(id);
                
                setProfile(
                    <StyledContainer>
                        <p>Username: {profile.username}</p>
                        <p>First Name: {profile.firstName}</p>
                        <p>Last Name: {profile.lastName}</p>
                        <p>Birthday: {profile.birthday}</p>
                        <p>Location: {profile.location}</p>
                        <p>Bio: {profile.bio}</p>
                        <p>Followers: {profile.followers.length}</p>
                        <p>Following: {profile.following.length}</p>
                    </StyledContainer>
                )
            }
        })();
    }, [id, props])

    return (
        <div>
            {error}
            {profile}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDetails));