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

export const editProfileFetch = async (profile: Profile, token: string): Promise<Response> => {
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

export const followProfileFetch = async (profile: Profile, token: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        cache: 'default'
    }

    return await fetch(config.API.PROFILE_SERVICE + '/profiles/' + profile.id + '/follow', options);
}

export const unfollowProfileFetch = async (profile: Profile, token: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        cache: 'default'
    }

    return await fetch(config.API.PROFILE_SERVICE + '/profiles/' + profile.id + '/unfollow', options);
}