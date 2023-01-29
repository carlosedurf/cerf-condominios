import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer"

import WallScreen from "../screens/WallScreen";

import DrawerCustom from "../components/DrawerCustom";

const Drawer = createDrawerNavigator();

const MainDrawer: React.FC = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerCustom {...props} />}
            screenOptions={{
                headerShown: true, 
                headerTitle: '', 
                headerStyle: {
                    backgroundColor: '#F5F6FA',
                    shadowOpacity: 0,
                    elevation: 0
                }
            }}
        >
            <Drawer.Screen
                name="WallScreen"
                component={WallScreen}
            />
        </Drawer.Navigator>
    );
};

export default MainDrawer