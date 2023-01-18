import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    token: '',
    user: {},
    property: {}
};

const initialAction = {
    type: '',
    payload: initialState
};

type StateType = {
    token: string,
    user: Object,
    property: Object
};

type ActionType = {
    type: String,
    payload: StateType
};

export default (state: StateType = initialState, action: ActionType = initialAction) => {
    switch(action.type) {
        case 'setToken':
            AsyncStorage.setItem('token', action.payload.token);
            return {...state, token: action.payload.token};
        case 'setUser':
            return {...state, user: action.payload.user};
        case 'setProperty':
            return {...state, property: action.payload.property};
    }
    return state;
};