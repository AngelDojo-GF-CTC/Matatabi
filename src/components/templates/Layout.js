import React from "react";
import { Header } from "../molecules/Header";
import { View } from "react-native";
import { Box } from "native-base";

export const Layout = ({ children }) => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Header />
      <Box style={{ margin: 30 }}>{children}</Box>
    </View>
  );
};
