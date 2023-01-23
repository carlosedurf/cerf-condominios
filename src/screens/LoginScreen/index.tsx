import React, {useEffect} from "react";
import {useNavigation} from "@react-navigation/native"
import C from "./style";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    
    return (
        <C.Container>
            <C.Texto>TELA DE LOGIN</C.Texto>
        </C.Container>
    );
};

export default LoginScreen;