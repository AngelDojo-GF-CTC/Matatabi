import React from "react";
import { Authenticater } from "./src/components/templates/Authenticater";
import { SignOutButton } from "./src/components/atoms/Buttons/SignOutButton";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Amplify, I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui";
import { dict } from "./src/constants/lacales/auth";
import { NativeBaseProvider } from "native-base";
import awsconfig from "./src/aws-exports";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "./src/components/templates/Layout";
import { Header } from "./src/components/molecules/Header";

I18n.putVocabularies(translations);
I18n.setLanguage("ja");
I18n.putVocabularies({ ...dict });

Amplify.configure(awsconfig);

export default function App() {
  return (
    <NativeBaseProvider>
      <Authenticater>
        <Layout>
          <View style={styles.container}>
            <Text>
              Open up App.aaaaaaaaaaaaaazzzzzzzzzzzzaassssssssssssssssssssssssjs
              to start working on your app!
            </Text>
            <StatusBar style="auto" />
          </View>

          {/*<SignOutButton />*/}
        </Layout>
      </Authenticater>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
