import React from "react";
import { Layout } from "../templates/Layout";
import { SignOutButton } from "../atoms/Buttons/SignOutButton";
import { ReceiveTravelForm } from "../molecules/ReceiveTravelForm";
import { View } from "native-base";

export const Settings = () => {
  return (
    <Layout>
      <View bgColor={"white"} h={"100%"} w={"100%"}>
        <ReceiveTravelForm />
      </View>
    </Layout>
  );
};
