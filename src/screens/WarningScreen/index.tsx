import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native"
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import C from "./styled";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

import WarningItem from "../../components/WarningItem";

const DocumentScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const getWarnings = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getWarnings(); 
        setLoading(false);
        if (result.error !== '') {
            Alert.alert('Atenção', result.error);
            return;
        }
        setList(result.list);
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Livro de Ocorrências',
            headerRight: () => (
                <C.AddButton onPress={() => navigation.navigate('WarningAddScreen')}>
                    <Icon name="plus" size={24} color="#000" />
                </C.AddButton>
            ),
        });
        getWarnings();
    }, []);

    return (
        <C.Container>
            {!loading && list.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há ocorrências.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={list}
                onRefresh={getWarnings}
                refreshing={loading}
                renderItem={({item}) => <WarningItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </C.Container>
    );
};

export default DocumentScreen;