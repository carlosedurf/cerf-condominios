import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import PreloadScreen from "../screens/PreloadScreen";
import LoginScreen from "../screens/LoginScreen";
import ChoosePropertyScreen from "../screens/ChoosePropertyScreen";
import RegisterScreen from "../screens/RegisterScreen";

const stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
    return (
        <stack.Navigator screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: '#F5F6FA',
            }
        }}>
            <stack.Screen
                name="PreloadScreen"
                component={PreloadScreen}
                options={{headerShown: false}}
            />
            <stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <stack.Screen
                name="ChoosePropertyScreen"
                component={ChoosePropertyScreen}
                options={{headerShown: false}}
            />
            <stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerShown: true}}
            />
        </stack.Navigator>
    );
}

export default AuthStack;