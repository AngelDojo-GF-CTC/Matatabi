import React from "react";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { Authenticater } from "./src/components/templates/Authenticater";
import { Amplify, I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui";
import { dict } from "./src/constants/lacales/auth";
import { TabContainer } from "./src/navigations/TabContainer";
import awsconfig from "./src/aws-exports";
import { createStackNavigator } from "@react-navigation/stack";
import { PhotoGallery } from "./src/components/molecules/PhotoGallery";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

I18n.putVocabularies(translations);
I18n.setLanguage("ja");
I18n.putVocabularies({ ...dict });

Amplify.configure(awsconfig);
const Stack = createStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <Authenticater>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="TabContainer" component={TabContainer} />
              <Stack.Screen name="PhotoGallery" component={PhotoGallery} />
            </Stack.Navigator>
          </NavigationContainer>
        </Authenticater>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
