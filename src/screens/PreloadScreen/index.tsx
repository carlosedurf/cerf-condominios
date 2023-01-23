import React, {useEffect} from "react";
import {useNavigation} from "@react-navigation/native"
import C from "./style";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

const PreloadScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    useEffect(() => {
        const checkLogin = async () => {
            const token = await api.getToken();
            if (token) {
                const result = await api.validateToken();
                if (result.error === "") {
                    dispatch({type: 'setUser', payload: {user: result.user}});
                    navigation.reset({
                        index: 1,
                        routes: [{name: 'ChoosePropertyScreen'}]
                    });
                } else {
                    alert(result.error);
                    dispatch({type: 'setToken', payload: {token: ''}});
                    navigation.reset({
                        index: 1,
                        routes: [{name: 'LoginScreen'}]
                    });

                }
            } else {
                navigation.reset({
                    index: 1,
                    routes: [{name: 'LoginScreen'}]
                });
            }
        };
        checkLogin();
    }, []);

    // Remover
    const handleLogoutButton = async () => {
        await api.logout();
        navigation.reset({index: 1, routes:[{name: 'LoginScreen'}]});
    };

    return (
        <C.Container>
            <C.LoadingIcon color="#8863E6" size="large" />
            <C.Button title="SAIR" onPress={handleLogoutButton} />
        </C.Container>
    );
};

export default PreloadScreen;