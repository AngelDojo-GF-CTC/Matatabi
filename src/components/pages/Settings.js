import React from "react";
import { View, Text } from "react-native";
import { Layout } from "../templates/Layout";

export const Settings = () => {
  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings Screen</Text>
      </View>
    </Layout>
  );
};
