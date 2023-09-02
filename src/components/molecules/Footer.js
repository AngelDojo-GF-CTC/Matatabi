import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { View, Image, StyleSheet } from "react-native";
import { color } from "../../styles/color";

export const Footer = () => {
  const icons = [faHouse, faBell, faGear];

  return (
    <View
      style={{
        justifyContent: "space-around",
        backgroundColor: color.background,
        flexDirection: "row",
        height: 60,
      }}
    >
      {icons.map((icon, index) => (
        <View style={{ marginTop: 10 }}>
          <FontAwesomeIcon icon={icon} size={40} />
        </View>
      ))}
      {/* アイコンの見え方変えたい
      https://fontawesome.com/icons/house?f=classic&s=light&sz=sm */}
    </View>
  );
};
