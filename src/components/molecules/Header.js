import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import matatabi_rogo from "../../../assets/Matatabi_rogo.png";
import { color } from "../../styles/color";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export const Header = ({ handleResetPage }) => {
  const handleClick = () => {
    handleResetPage && handleResetPage();
  };
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
        <TouchableOpacity onPress={handleClick}>
          <Image
            source={matatabi_rogo}
            alt="logo"
            style={{
              width: 175,
              height: 42,
              marginTop: 45,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 50, marginRight: 15 }}>
        <FontAwesomeIcon icon={faCircleUser} size={32} />
      </View>
    </View>
  );
};
