import axios from 'axios';

const baseUrl = 'https://localhost:9998/api';
const endpoints = {
    register: {
        url: `${baseUrl}/user/register`,
        method: 'POST',
    },
    login: {
        url: `${baseUrl}/user/login`,
        method: 'POST',
    },
    me: {
        url: `${baseUrl}/user/me`,
        method: 'GET',
    },
    updateOwn: {
        url: `${baseUrl}/user/me`,
        method: 'PATCH',
    },
    updateOne: {
        url: `${baseUrl}/user/:id`,
        method: 'PATCH',
    },
    userProfile: {
        url: `${baseUrl}/user/profile/:id`,
        method: 'GET',
    },
    users: {
        url: `${baseUrl}/users`,
        method: 'GET',
    },
    logout: {
        url: `${baseUrl}/user/logout`,
        method: 'POST',
    },
    removeUser: {
        url: `${baseUrl}/user/:id`,
        method: 'DELETE',
    },
    create: {
        url: `${baseUrl}/app/create`,
        method: 'POST',
    },
    app: {
        url: `${baseUrl}/app`,
        method: 'GET',
    },
};

export default function req({
    target = '', body = {}, headers = { 'Access-Control-Allow-Origin': '*' }, params = {},
}) {
    const endpoint = endpoints[target];
    if (!endpoint) {
        throw new Error(`Invalid endpoint target: ${target}`);
    }

    const config = {
        url: endpoint.url,
        method: endpoint.method,
        headers: { ...endpoint.headers, ...headers },
        data: { ...endpoint.body, ...body },
        params: { ...params },
        withCredentials: true,
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}
