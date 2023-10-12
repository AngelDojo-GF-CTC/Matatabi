import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { Home } from "../components/pages/Home";
import { Notify } from "../components/pages/Notify";
import { Settings } from "../components/pages/Settings";
import { color } from "../styles/color";
import * as navigation from "../constants/navigations";

const Tab = createBottomTabNavigator();

export const TabContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.accent,
        tabBarStyle: { backgroundColor: color.background, height: 70 },
      }}
      initialRouteName={navigation.HOME}
    >
      <Tab.Screen
        // name={navigation.HOME}
        name="Home"
        component={Home}
        options={{
          title: "ホーム",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHouse} size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        // name={navigation.NOTIFY}
        name="Notify"
        component={Notify}
        options={{
          title: "通知",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faBell} size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        // name={navigation.SETTINGS}
        name="Settings"
        component={Settings}
        options={{
          title: "設定",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faGear} size={35} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
