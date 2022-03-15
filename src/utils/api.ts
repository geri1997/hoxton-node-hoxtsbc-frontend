import { RequestBody } from './types';

// FINISH-ME: set to your server's endpoint
export const host = `http://localhost:3009`;

export const sendRequest = async (
    endpoint: string,
    method: string,
    bodyParam?: RequestBody,
    token?: string
) => {
    const headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (token) headers.authorization = token;

    const body = bodyParam ? JSON.stringify(bodyParam) : undefined;

    const result = await fetch(`${host}/${endpoint}`, {
        method,
        headers,
        body,
    });
    console.log(result);
    return result.json();
};

export const handleLogout = async () => {
    //FINISH-ME: remove token from local storage
    window.localStorage.removeItem('token');

    window.location.href = '/';
};

export const handleSignUp = async (body: RequestBody) => {
    // const user = await sendRequest('register', 'POST', body).then()

    // window.localStorage.setItem('token', user.token);
    // window.location.href = '/';

    await sendRequest('signup', 'POST', body);
    window.location.href = '/';
};

export const handleLogin = async (body: RequestBody) => {
    const result = await sendRequest('login', 'POST', body);

    const { data, token, error } = result;
    // FINISH-ME: set token in local storage
    localStorage.setItem('token', token);

    return { data, error };
};

export const signInWithJWT = async () => {
    let token = localStorage.getItem('token'); // FINISH-ME: check for token
    console.log(token);
    // Note: if token is not found, it can be 'undefined'(string)
    if (!token || token === 'undefined') return;
    console.log('a');
    const result = await sendRequest('banking-info', 'GET', undefined, token);
    console.log(result);
    return result || null;
};
