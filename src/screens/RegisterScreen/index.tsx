import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native"
import C from "./style";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";
import { Alert } from "react-native";

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    useEffect(() => {
        navigation.setOptions({headerTitle: 'Fazer Cadastro'});
    }, []);

    const handleRegisterButton = async () => {
        if (!name || !email || !cpf || !password || !passwordConfirmed) {
            Alert.alert('Fazer Cadastro', 'Preencha os campos!');
            return;
        }
        const result = await api.register(name, email, cpf, password, passwordConfirmed);
        if (result.error !== '') {
            Alert.alert('Atenção', result.error);
            return;
        }
        dispatch({type: 'setToken', payload: {token: result.token}});
        dispatch({type: 'setUser', payload: {user: result.user}});
        navigation.reset({index: 1, routes: [{name: 'ChoosePropertyScreen'}]});
    };
    
    return (
        <C.Container>
            <C.Field
                placeholder="Digite seu Nome Completo"
                value={name}
                onChangeText={t=>setName(t)}
            />
            <C.Field
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />
            <C.Field
                placeholder="Digite seu E-mail"
                value={email}
                onChangeText={t=>setEmail(t)}
            />
            <C.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
            />
            <C.Field
                placeholder="Digite sua Senha Novamente"
                secureTextEntry={true}
                value={passwordConfirmed}
                onChangeText={t=>setPasswordConfirmed(t)}
            />
            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR-SE</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );
};

export default RegisterScreen;