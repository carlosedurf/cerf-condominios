import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = 'https://api.b7web.com.br/devcond/api';

const request = async (method: string, endpoint: string, params: any, token?: string|null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body: any = {};

    switch(method) {
        case 'get':
                const queryString = new URLSearchParams(params).toString();
                fullUrl += `${queryString}`;
            break;
        case 'post':
        case 'put':
        case 'delete':
                body = JSON.stringify(params);
            break;
    }

    let headers: any = {'Content-Type': 'application/json'};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let req = await fetch(fullUrl, {method, headers, body});
    const res = await req.json();
    return res;
};

export default {
    getToken: async () => {
        return await AsyncStorage.getItem('token');
    },
    validateToken: async () => {
        const token: string|null = await AsyncStorage.getItem('token');
        const json = await request('post', '/auth/validate', {}, token);
        return json;
    },
    login: async (cpf, password) => {
        const json = await request('post', '/auth/login', {cpf, password});
        return json;
    },
    logout: async () => {
        const token: string|null = await AsyncStorage.getItem('token');
        const json = await request('post', '/auth/logout', {}, token);
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('property');
        return json;
    },
    register: async (name, email, cpf, password, password_confirm) => {
        const json = await request('post', '/auth/register', {
            name, email, cpf, password, password_confirm
        });
        return json;
    },
};;