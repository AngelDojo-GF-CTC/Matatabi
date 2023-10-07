import React from "react";
import { HStack, Heading, Image, Spinner, Text, View } from "native-base";
import catFoot from "../../../assets/catFoot.png";

export const MatatabiLoading = ({}) => (
  <View
    style={{
      alignContent: "center",
      alignItems: "center",
      marginTop: "50%",
      height: "100%",
      width: "100%",
    }}
  >
    <HStack space={2} justifyContent="center">
      <Spinner
        accessibilityLabel="Loading posts"
        color="warning.300"
        size="lg"
      />
      <Heading color="warning.300" fontSize="2xl" marginTop="2">
        <Text>Loading</Text>
      </Heading>
      <Image
        alt="catFoot"
        source={catFoot}
        style={{ width: 50, height: 30 }}
        marginTop={3}
      />
    </HStack>
  </View>
);
