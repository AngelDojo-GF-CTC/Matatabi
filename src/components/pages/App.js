import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { Authenticater } from "../templates/Authenticater";
import { Amplify, I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui";
import { dict } from "../../constants/lacales/auth";
import { TabContainer } from "../../navigations/TabContainer";
import awsconfig from "../../aws-exports";
import { useEffect } from 'react';
import { createMap } from "maplibre-gl-js-amplify";

I18n.putVocabularies(translations);
I18n.setLanguage("ja");
I18n.putVocabularies({ ...dict });

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
 //   <NativeBaseProvider>
 //     <Authenticater>
 //       <NavigationContainer>
 //         <TabContainer />
  //      </NavigationContainer>
 //     </Authenticater>
 //   </NativeBaseProvider>
  );
}

export default App;
