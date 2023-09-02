import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { Home } from "../components/pages/Home";
import { Notify } from "../components/pages/Notify";
import { Settings } from "../components/pages/Settings";
import { color } from "../styles/color";
import * as navigation from "../constants/navigations";

const Tab = createMaterialTopTabNavigator();

export const TabContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: color.background, height: 70 },
      }}
      initialRouteName={navigation.HOME}
      tabBarPosition="bottom"
    >
      <Tab.Screen
        name={navigation.HOME}
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              icon={faHouse}
              size={35}
              color={focused ? color.accent : color.base}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigation.NOTIFY}
        component={Notify}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              icon={faBell}
              size={35}
              color={focused ? color.accent : color.base}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigation.SETTINGS}
        component={Settings}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              icon={faGear}
              size={35}
              color={focused ? color.accent : color.base}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
