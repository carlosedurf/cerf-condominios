import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native"
import C from "./styled";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

const WallScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    return (
        <C.Container>
            <C.Scroller>
                {loading &&
                    <C.LoadingIcon color="#8863E6" size="large" />
                }
                
            </C.Scroller>
        </C.Container>
    );
};

export default WallScreen;