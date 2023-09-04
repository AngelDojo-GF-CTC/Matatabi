import React from "react";
import { Header } from "../molecules/Header";
import { View } from "react-native";

export const Layout = ({ children }) => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Header />
      {children}
    </View>
  );
};
