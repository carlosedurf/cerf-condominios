import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = 'https://api.b7web.com.br/devcond/api';

const request = async (method: string, endpoint: string, params: any, token?: string|null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body: any = {};

    switch(method) {
        case 'get':
                const queryString = new URLSearchParams(params).toString();
                fullUrl += `?${queryString}`;
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
    getDocs: async () => {
        const token: any = await AsyncStorage.getItem('token');
        const json = await request('get', `/docs`, {}, token);
        return json;
    },
    getBillets: async () => {
        const token: any = await AsyncStorage.getItem('token');
        let property: any = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        const json = await request('get', `/billets`, {
            property: property.id
        }, token);
        return json;
    },
    getWarnings: async () => {
        const token: any = await AsyncStorage.getItem('token');
        let property: any = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        const json = await request('get', `/warnings`, {
            property: property.id
        }, token);
        return json;
    },
    addWarningFile: async (file: any) => {
            const token: any = await AsyncStorage.getItem('token');
            const image = file.assets[0];
            console.log(image);
            let formData = new FormData();
            formData.append('photo', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
            const req = await axios.post(`${baseUrl}/warning/file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(req.data);
            const res = req.data;
            return res;
    },
    addWarning: async (title: string, list: any) => {
        const token: any = await AsyncStorage.getItem('token');
        let property: any = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        const json = await request('post', `/warning`, {
            title,
            list,
            property: property.id
        }, token);
        return json;
    },
};