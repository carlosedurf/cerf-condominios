import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native"
import { Alert } from "react-native";
import {launchCamera} from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import C from "./styled";

import {useStateValue}  from "../../contexts/StateContext";
import api from "../../services/api";

const DocumentScreen: React.FC = () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [warningText, setWarningText] = useState('');
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Adicionar uma Ocorrência'
        });
        setLoading(false);
        setPhotoList([]);
    }, []);

    const handleAddPhoto = async () => {
        launchCamera({
            mediaType: 'photo',
            maxWidth: 1280,
        }, async response => {
            if (!response.didCancel) {
                setLoading(true);
                const result = await api.addWarningFile(response);
                // if (result.error !== '') {
                //     Alert.alert('Atenção', result.error);
                //     return;
                // }
                // let list = [...photoList];
                // list.push(result.photo);
                // setPhotoList(list);
                setLoading(false);
            }
        });
    };

    return (
        <C.Container>
            <C.Scroller>
                <C.Title>Descreva a ocorrência</C.Title>
                <C.Field
                    placeholder="Ex: Vizinho X está com som alto."
                    value={warningText}
                    onChangeText={t => setWarningText(t)}
                />
                <C.Title>Fotos relacionadas</C.Title>
                <C.PhotoArea>
                    <C.PhotoScroll horizontal={true}>
                        <C.PhotoAddButton onPress={handleAddPhoto}>
                            <Icon name="camera" size={24} color="#000" />
                        </C.PhotoAddButton>
                        {photoList.map((item, index) => (
                            <C.PhotoItem key={index}>
                                <C.Photo source={{uri: item}} />
                                <C.PhotoRemoveButton onPress={null}>
                                    <Icon name="remove" size={16} color="#FF0000" />
                                </C.PhotoRemoveButton>
                            </C.PhotoItem>
                        ))}
                    </C.PhotoScroll>
                </C.PhotoArea>

                {loading &&
                    <C.LoadingText>Enviando foto. Aguarde.</C.LoadingText>
                }

                <C.ButtonArea onPress={null}>
                    <C.ButtonText>Salvar</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller>
        </C.Container>
    );
};

export default DocumentScreen;