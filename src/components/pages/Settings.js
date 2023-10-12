import React from "react";
import { Layout } from "../templates/Layout";
import { SignOutButton } from "../atoms/Buttons/SignOutButton";
import { ReceiveTravelForm } from "../molecules/ReceiveTravelForm";
import { View } from "native-base";
import { useNavigation } from "@react-navigation/native";

export const Settings = () => {
  const navigation = useNavigation();
  return (
    <Layout handleResetPage={() => navigation.navigate("Home")}>
      <View bgColor={"white"} h={"100%"} w={"100%"}>
        <ReceiveTravelForm />
      </View>
    </Layout>
  );
};
