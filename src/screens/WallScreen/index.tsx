import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native"
import C from "./styled";
import { Alert } from "react-native";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

import WallItem from "../../components/WallItem";

const WallScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [wallList, setWallList] = useState([]);

    const getWalls = async () => {
        setWallList([]);
        setLoading(true);
        const result = await api.getWall(); 
        setLoading(false);
        if (result.error !== '') {
            Alert.alert('Atenção', result.error);
            return;
        }
        setWallList(result.list);
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Mural de Avisos'
        });
        getWalls();
    }, []);

    return (
        <C.Container>
            {!loading && wallList.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há avisos.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={wallList}
                onRefresh={getWalls}
                refreshing={loading}
                renderItem={({item}) => <WallItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </C.Container>
    );
};

export default WallScreen;