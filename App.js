import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { Authenticater } from "./src/components/templates/Authenticater";
import { Amplify, I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui";
import { dict } from "./src/constants/lacales/auth";
import { TabContainer } from "./src/navigations/TabContainer";
import awsconfig from "./src/aws-exports";


I18n.putVocabularies(translations);
I18n.setLanguage("ja");
I18n.putVocabularies({ ...dict });

Amplify.configure(awsconfig);

export default function App() {
  return (
   <NativeBaseProvider>
     <Authenticater>
       <NavigationContainer>
         <TabContainer />
       </NavigationContainer>
     </Authenticater>
   </NativeBaseProvider>
  );
}
