import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native"
import { Alert } from "react-native";
import C from "./styled";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

import DocItem from "../../components/DocItem";

const DocumentScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [dockList, setDocList] = useState([]);

    const getBillets = async () => {
        setDocList([]);
        setLoading(true);
        const result = await api.getBillets(); 
        setLoading(false);
        if (result.error !== '') {
            Alert.alert('Atenção', result.error);
            return;
        }
        setDocList(result.list);
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Boletos'
        });
        getBillets();
    }, []);

    return (
        <C.Container>
            {!loading && dockList.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há boletos dessa unidade.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={dockList}
                onRefresh={getBillets}
                refreshing={loading}
                renderItem={({item}) => <DocItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </C.Container>
    );
};

export default DocumentScreen;