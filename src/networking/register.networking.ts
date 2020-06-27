import RegisterUser from "../entities/RegisterUser.entity";
import config from "../config.json";

export const registerPasswordFetch = async (user: RegisterUser): Promise<Response> => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    return await fetch(config.API.USER_SERVICE + "/register/password", options);
}

export const registerGoogleFetch = async (tokenId: string): Promise<Response> => {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({ tokenId: tokenId })
        }

        return await fetch(config.API.USER_SERVICE + '/register/google', options);
}