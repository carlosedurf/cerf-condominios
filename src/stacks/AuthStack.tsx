import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import PreloadScreen from "../screens/PreloadScreen";

const stack = createNativeStackNavigator();

export default () => {
    return (
        <stack.Navigator>
            <stack.Screen
                name="PreloadScreen"
                component={PreloadScreen}
                options={{headerShown: false}}
            />
        </stack.Navigator>
    );
}