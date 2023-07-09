import axios from 'axios';
/**
 * Send an HTTP request to the specified endpoint.
 *
 * @param {Object} options - The options for the request.
 * @param {string} options.target - The target endpoint name.
 * @param {Object} [options.body={}] - The request body data.
 * @param {Object} [options.headers={ 'Access-Control-Allow-Origin': '*' }] - The request headers.
 * @param {Object} [options.query={}] - The query parameters.
 * @param {string} [options.param=''] - The URL parameter.
 * @returns {Promise} A promise that resolves with the response data or rejects with an error.
 * @throws {Error} If the target endpoint is invalid.
 */

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
