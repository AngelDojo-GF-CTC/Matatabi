import React from "react";
import { View, Text } from "react-native";
import { Layout } from "../templates/Layout";

export const Notify = () => {
  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Notify Screen</Text>
      </View>
    </Layout>
  );
};
