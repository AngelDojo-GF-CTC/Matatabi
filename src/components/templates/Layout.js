import React from "react";
import { Header } from "../molecules/Header";
import { View } from "react-native";

export const Layout = ({ handleResetPage, children }) => {
  return (
    <View /*style={{ height: "100%", width: "100%" }}*/>
      <Header handleResetPage={handleResetPage} />
      {children}
    </View>
  );
};
