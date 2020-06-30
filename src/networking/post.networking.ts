import config from "../config.json";
import Post from "../entities/Post.entity";
import CreatePost from "../entities/CreatePost.entity";

export const postsFetch = async (): Promise<Response> => {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'default'
    }

    return await fetch(config.API.POST_SERVICE + '/posts', options);
}

export const postFetch = async (id: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'default'
    }

    return await fetch(config.API.POST_SERVICE + '/posts/' + id, options);
}

export const createPostFetch = async (post: CreatePost, token: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        cache: 'default',
        body: JSON.stringify(post)
    }

    return await fetch(config.API.POST_SERVICE + '/posts', options);
}

export const likePostFetch = async (post: Post, token: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        cache: 'default'
    }

    return await fetch(config.API.POST_SERVICE + '/posts/' + post.id + '/likes', options);
}

export const unlikePostFetch = async (post: Post, token: string): Promise<Response> => {
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        cache: 'default'
    }

    return await fetch(config.API.POST_SERVICE + '/posts/' + post.id + '/likes', options);
}