import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer"

import WallScreen from "../screens/WallScreen";
import DocumentScreen from "../screens/DocumentScreen";
import BilletScreen from "../screens/BilletScreen";
import WarningScreen from "../screens/WarningScreen";
import WarningAddScreen from "../screens/WarningAddScreen";
import ReservationScreen from "../screens/ReservationScreen";

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
            <Drawer.Screen
                name="DocumentScreen"
                component={DocumentScreen}
            />
            <Drawer.Screen
                name="BilletScreen"
                component={BilletScreen}
            />
            <Drawer.Screen
                name="WarningScreen"
                component={WarningScreen}
            />
            <Drawer.Screen
                name="WarningAddScreen"
                component={WarningAddScreen}
            />
            <Drawer.Screen
                name="ReservationScreen"
                component={ReservationScreen}
            />
        </Drawer.Navigator>
    );
};

export default MainDrawer