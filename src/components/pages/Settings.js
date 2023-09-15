import React from "react";
import { View, Text } from "react-native";
import { Layout } from "../templates/Layout";
import { SignOutButton } from "../atoms/Buttons/SignOutButton";


Amplify.configure(awsconfig);

function App() {
  useEffect(() => {
    createMap({
      container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
      center: [139.7674681227469, 35.68111419325676], // 東京駅
      zoom: 14,
  })
  }, []);
  return (
    <div id="map" style={{height: '100vh'}}/>
  );
}

export default App;

//export const Settings = () => {
//  return (
//    <Layout>
//      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//        <Text>Settings Screen</Text>
//      </View>
//      <SignOutButton />
//    </Layout>
//  );
//};
