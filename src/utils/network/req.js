import axios from 'axios';

const baseUrl = 'https://localhost:9998/api';
const endpoints = {
    registerUser: {
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
        url: `${baseUrl}/user`,
        method: 'PATCH',
    },
    userProfile: {
        url: `${baseUrl}/user/profile`,
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
        url: `${baseUrl}/user`,
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
    target = '',
    body = {},
    headers = { 'Access-Control-Allow-Origin': '*' },
    query = {},
    param = '',
}) {
    const endpoint = endpoints[target];
    if (!endpoint) {
        throw new Error(`Invalid endpoint target: ${target}`);
    }

    let { url } = endpoint;
    if (param) {
        url += `/${param}`;
    }

    const config = {
        url,
        method: endpoint.method,
        headers: { ...endpoint.headers, ...headers },
        data: body,
        params: { ...query },
        withCredentials: true,
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}
