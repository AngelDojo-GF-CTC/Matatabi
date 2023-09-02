import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import matatabi_rogo from "../../../assets/Matatabi_rogo.png";
import { color } from "../../styles/color";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: color.background,
        height: 100,
      }}
      accessibilityRole="header"
    >
      <View style={{ flex: 1 }}>
        <Image
          source={matatabi_rogo}
          alt="logo"
          style={{ width: 175, height: 50, marginTop: 40, marginLeft: 10 }}
        />
      </View>
      <View style={{ marginTop: 50, marginRight: 15 }}>
        <FontAwesomeIcon icon={faCircleUser} size={32} />
      </View>
    </View>
  );
};
