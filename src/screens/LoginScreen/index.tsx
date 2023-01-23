import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native"
import C from "./style";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";
import { Alert } from "react-native";

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButton = async () => {
        if (!cpf || !password) {
            Alert.alert('Login', 'Preencha os campos!');
            return;
        }
        const result = await api.login(cpf, password);
        if (result.error !== '') {
            Alert.alert('Login', result.error);
            return;
        }
        dispatch({type: 'setToken', payload: {token: result.token}});
        dispatch({type: 'setUser', payload: {user: result.user}});
        navigation.reset({index: 1, routes: [{name: 'ChoosePropertyScreen'}]});
    };

    const handleRegisterButton = () => {
        navigation.navigate('RegisterScreen');
    };
    
    return (
        <C.Container>
            <C.Logo
                source={require('../../assets/undraw_home.png')}
                resizeMode="contain"
            />

            <C.Field
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />
            <C.Field
                placeholder="Digite sua senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
            />
            <C.ButtonArea onPress={handleLoginButton}>
                <C.ButtonText>ENTRAR</C.ButtonText>
            </C.ButtonArea>
            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR-SE</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );
};

export default LoginScreen;