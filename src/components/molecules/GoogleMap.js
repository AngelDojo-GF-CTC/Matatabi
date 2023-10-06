import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Heading,
  Image,
  Spinner,
  StatusBar,
  Text,
  View,
} from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import footPrint from "../../../assets/footPrint.png";
import catFoot from "../../../assets/catFoot.png";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { StyleSheet } from "react-native";

const updateCurrentLocation = (setCurrentCoordinate) => {
  Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  }).then((location) => {
    const { latitude, longitude } = location.coords;
    setCurrentCoordinate((prev) => ({ ...prev, latitude, longitude }));
  });
};
const getLocationPermissions = async (
  setLocationPermission,
  setCurrentCoordinate
) => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
  if ("granted" === status) {
    await setLocationPermission(true);

    // 最初はすぐに取得
    updateCurrentLocation(setCurrentCoordinate);

    // 1秒ごとに位置情報を取得
    const locationInterval = setInterval(() => {
      updateCurrentLocation(setCurrentCoordinate);
      console.log("setInterval is running"); // ログを出力
    }, 500);

    return () => {
      // コンポーネントがアンマウントされたときにクリア
      clearInterval(locationInterval);
    };
  }
};
export const GoogleMap = ({}) => {
  const [startSpot, setStartSpot] = useState({
    latitude: 34.7024,
    longitude: 135.4959,
  });
  const [endSpot, setEndSpot] = useState({
    latitude: 35.710139,
    longitude: 139.81083,
  });

  const [locationPermission, setLocationPermission] = useState(false);
  const [currentCoordinate, setCurrentCoordinate] = useState({
    latitude: undefined,
    longitude: undefined,
    latitudeDelta: 0.0361,
    longitudeDelta: 0.021,
  });

  useEffect(() => {
    getLocationPermissions(setLocationPermission, setCurrentCoordinate);
  }, []);

  return (
    <>
      <View style={{ backgroundColor: "white", height: "100%" }}>
        {currentCoordinate.latitude ? ( // データがあるかどうかをチェック
          <MapView
            style={{ height: "30%", width: "100%" }}
            provider={PROVIDER_GOOGLE}
            initialRegion={currentCoordinate}
          >
            <Marker
              key="end"
              coordinate={endSpot}
              title="End"
              description="End Point"
            />
            <Marker
              key="current"
              coordinate={currentCoordinate}
              title="Current"
              description="Current Point"
            >
              <Image
                alt="footPrint"
                source={footPrint}
                style={{ width: 30, height: 30 }}
              />
            </Marker>
            <MapViewDirections
              origin={currentCoordinate}
              destination={endSpot}
              apikey="AIzaSyAGwm9_X6uxVsnsCw9yw99QcZyslQOy50I"
              strokeWidth={3}
              strokeColor="hotpink"
            />
          </MapView>
        ) : (
          // 画面中央に大きく表示
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              marginTop: "30%",
            }}
          >
            <HStack space={2} justifyContent="center">
              <Spinner
                accessibilityLabel="Loading posts"
                color="warning.300"
                size="lg"
              />
              <Heading color="warning.300" fontSize="2xl" marginTop="2">
                <Text>Loading</Text>
              </Heading>
              <Image
                alt="catFoot"
                source={catFoot}
                style={{ width: 50, height: 30 }}
                marginTop={3}
              />
            </HStack>
          </View>
        )}
      </View>
    </>
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
