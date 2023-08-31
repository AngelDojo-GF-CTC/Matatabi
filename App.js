import React from "react";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { SignOutButton } from "./src/components/atoms/Buttons/SignOutButton";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Amplify, I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui";
import { dict } from "./src/constants/lacales/auth";
I18n.putVocabularies(translations);
I18n.setLanguage("ja");
I18n.putVocabularies({ ...dict });
import awsconfig from "./src/aws-exports";

Amplify.configure(awsconfig);

export const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator
        loginMechanisms={awsconfig.aws_cognito_verification_mechanisms.map(
          (str) => str.toLowerCase()
        )}
        signUpAttributes={awsconfig.aws_cognito_signup_attributes.map((str) =>
          str.toLowerCase()
        )}
        usernameAttributes={awsconfig.aws_cognito_username_attributes.map(
          (str) => str.toLowerCase()
        )}
        socialProviders={awsconfig.aws_cognito_social_providers.map((str) =>
          str.toLowerCase()
        )}
      >
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>

        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
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
