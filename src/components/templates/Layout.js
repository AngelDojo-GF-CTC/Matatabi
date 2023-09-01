import React from "react";
import { Header } from "../molecules/Header";
import { View, Image, StyleSheet } from "react-native";
import { Footer } from "../molecules/Footer";

export const Layout = ({ children }) => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Header />
      {children}
      <Footer />
    </View>
  );
};
