import config from "../config.json";
import Profile from "../entities/Profile.entity";

export const profileFetch = async (id: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'default'
    }

    return await fetch(config.API.PROFILE_SERVICE + '/profiles/' + id, options);
}

export const EditProfileFetch = async (profile: Profile, token: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        cache: 'default',
        body: JSON.stringify(profile)
    }

    return await fetch(config.API.PROFILE_SERVICE + '/profiles', options);
}