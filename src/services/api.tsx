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

    if (method === "get") {
        const req = await fetch(fullUrl, {method, headers});
        const res = await req.json();
        return res;
    }
    const req = await fetch(fullUrl, {method, headers, body});
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
    login: async (cpf: string, password: string) => {
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
    register: async (name: string, email: string, cpf: string, password: string, password_confirm: string) => {
        const json = await request('post', '/auth/register', {
            name, email, cpf, password, password_confirm
        });
        return json;
    },
    getWall: async () => {
        const token: any = await AsyncStorage.getItem('token');
        const json = await request('get', '/walls', {}, token);
        return json;
    },
    likeWallPost: async (id: number) => {
        const token: any = await AsyncStorage.getItem('token');
        const json = await request('post', `/wall/${id}/like`, {}, token);
        return json;
    },
};;