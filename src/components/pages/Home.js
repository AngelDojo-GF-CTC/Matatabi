import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Layout } from "../templates/Layout";

export const Home = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text>HOME</Text>
        <StatusBar style="auto" />
      </View>
      {/*<SignOutButton />*/}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
