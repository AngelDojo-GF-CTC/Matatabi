import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isMatatabiLoadingState } from "../recoil/atoms";
import { LogBox } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const useGoogleMap = (isDetailMode, values) => {
  const setIsMatatabiLoading = useSetRecoilState(isMatatabiLoadingState);
  // const [startSpot, setStartSpot] = useState({
  //   latitude: 34.7024,
  //   longitude: 135.4959,
  // });
  const [endSpot, setEndSpot] = useState({
    latitude: undefined,
    longitude: undefined,
  });

  const [locationPermission, setLocationPermission] = useState(false);
  const [currentCoordinate, setCurrentCoordinate] = useState({
    latitude: undefined,
    longitude: undefined,
    latitudeDelta: 0.0361,
    longitudeDelta: 0.021,
  });

  useEffect(() => {
    if (!isDetailMode) return;
    LogBox.ignoreLogs(["expo-permissions is now deprecated"]);
    getLocationPermissions(setLocationPermission, setCurrentCoordinate);
  }, [isDetailMode]);

  useEffect(() => {
    if (!isDetailMode || !values) return;
    // 最初は1日目の最初のスポットを表示
    setEndSpot({
      latitude: values[Object.keys(values)[0]][0].lat,
      longitude: values[Object.keys(values)[0]][0].lng,
    });
  }, [values, isDetailMode]);

  useEffect(() => {
    if (!isDetailMode) return;
    setIsMatatabiLoading(!currentCoordinate.latitude);
  }, [currentCoordinate.latitude, isDetailMode]);

  handleSpotPress = useCallback((lat, lng) => {
    setEndSpot({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  return {
    state: {
      // startSpot,
      endSpot,
      locationPermission,
      currentCoordinate,
    },
    funcs: {
      // setStartSpot,
      setEndSpot,
      setLocationPermission,
      setCurrentCoordinate,
      handleSpotPress,
    },
  };
};

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
      // console.log("setInterval is running"); // ログを出力
    }, 10000);

    return () => {
      // コンポーネントがアンマウントされたときにクリア
      clearInterval(locationInterval);
    };
  }
};
