import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button } from "native-base";

// TODO: Icon
export const SignOutButton = () => {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign Out</Button>;
};
