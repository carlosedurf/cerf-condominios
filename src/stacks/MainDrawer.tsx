import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer"

import WallScreen from "../screens/WallScreen";

import DrawerCustom from "../components/DrawerCustom";

const Drawer = createDrawerNavigator();

const MainDrawer: React.FC = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerCustom {...props} />}
        >
            <Drawer.Screen
                name="WallScreen"
                component={WallScreen}
                options={{headerShown: false}}
            />
        </Drawer.Navigator>
    );
};

export default MainDrawer