import LoginUser from "../entities/LoginUser.entity";
import config from "../config.json";

export const loginPasswordFetch = async (user: LoginUser): Promise<Response> => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    return await fetch(config.API.USER_SERVICE + "/login/password", options);
}

export const loginGoogleFetch = async (tokenId: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({tokenId: tokenId})
    }

    return await fetch(config.API.USER_SERVICE + "/login/google", options);
}