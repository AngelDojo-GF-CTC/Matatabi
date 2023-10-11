import React from "react";
import { View, Text } from "react-native";
import { Layout } from "../templates/Layout";
import { GoogleMap } from "../molecules/GoogleMap";
import { ImageBox } from "../molecules/ImageBox";

export const Notify = () => {
  return (
    <Layout>
      <View>
        {/* <GoogleMap /> */}
        <ImageBox />
      </View>
    </Layout>
  );
};
