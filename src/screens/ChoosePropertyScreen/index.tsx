import React, {useEffect} from "react";
import {useNavigation} from "@react-navigation/native"
import C from "./styled";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

const ChoosePropertyScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    return (
        <C.Container>
            <C.Texto>SUCESSO</C.Texto>
        </C.Container>
    );
};

export default ChoosePropertyScreen;