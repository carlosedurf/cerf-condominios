import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native"
import { Alert } from "react-native";
import C from "./styled";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

import ReservationItem from "../../components/ReservationItem";

const DocumentScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const getReservations = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getReservations(); 
        setLoading(false);
        if (result.error !== '') {
            Alert.alert('Atenção', result.error);
            return;
        }
        setList(result.list);
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Reservas Disponíveis'
        });
        getReservations();
    }, []);

    return (
        <C.Container>
            <C.Scroller contentContainerStyle={{paddingBottom: 40}}>
                <C.ButtonArea onPress={null}>
                    <C.ButtonText>Minhas Reservas</C.ButtonText>
                </C.ButtonArea>

                <C.Title>Selecione uma Área</C.Title>

                
                {loading &&
                    <C.LoadingIcon size="large" color="#8863E6" />
                }

                {!loading && list.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não há áreas disponiveis.</C.NoListText>
                    </C.NoListArea>
                }

                {list.map((item, index) => (
                    <ReservationItem
                        key={index}
                        data={item}
                    />
                ))}
            </C.Scroller>
        </C.Container>
    );
};

export default DocumentScreen;