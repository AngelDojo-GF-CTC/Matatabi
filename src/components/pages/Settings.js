import React from "react";
import { View, Text } from "react-native";
import { Layout } from "../templates/Layout";
import { SignOutButton } from "../atoms/Buttons/SignOutButton";
import { createMap } from "maplibre-gl-js-amplify";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import "maplibre-gl/dist/maplibre-gl.css";

Amplify.configure(awsconfig);

export const Settings = () => {
  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings Screen</Text>

        


      </View>
      <SignOutButton />
    </Layout>
  );
};
