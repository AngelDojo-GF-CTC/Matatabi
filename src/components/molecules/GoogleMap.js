import React from "react";
import { Box, StatusBar, Text, View } from "native-base";
import MapView from "react-native-maps";

export const GoogleMap = ({}) => {
  return (
    <>
      <View style={{ backgroundColor: "yellow", height: "100%" }}>
        <MapView
          style={{ height: "30%", width: "100%" }}
          provider="google"
          initialRegion={{
            latitude: 35.714,
            longitude: 139.4256,
            latitudeDelta: 0.0461,
            longitudeDelta: 0.021,
          }}
        />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
