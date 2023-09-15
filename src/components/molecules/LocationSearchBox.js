import React from "react";
import { View, Box, Input, Text, Button, StatusBar } from "native-base";
import { GOOGLE_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export const LocationSearchBox = () => {
  const handleOnPress = (data, details) => {
    console.log(data);
    console.log(details);
    console.log(data, details);
    const spotName = data.structured_formatting.main_text;
    console.log("スポット名： ", spotName);
    const spotAddress = data.description.split("、")[1];
    console.log("住所： ", spotAddress);
  };

  return (
    <>
      <View
        style={{
          padding: 10,
          height: "100%",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text fontSize="md" marginBottom="1rem">
          ここだけは外せないスポットを選ぼう！
        </Text>
        <GooglePlacesAutocomplete
          placeholder="観光地・住所"
          fetchDetails={true}
          onFail={(err) => {
            console.log(err);
          }}
          onPress={(data, details = null) => handleOnPress(data, details)}
          query={{
            key: GOOGLE_API_KEY,
            language: "ja",
            components: "country:jp",
          }}
        />
      </View>

      {/*  <View style={{ paddingTop: 40 }}>
       <Text mx="3">絶対に行きたい場所を登録しましょう</Text>
       {/* 見た目は後で変える  
       <View style={{ width: "80%", flexDirection: "row" }}>
         <Input mx="3" placeholder="観光地名・住所" w="80%" />
        <Button mx="3" onPress={() => {}}>
           追加
         </Button> 
     </View>
     </View>

    // テスト用 */}
      {/* <View>
        <MapView
          style={{ height: "10%", width: "10%" }}
          provider="google"
          initialRegion={{
            latitude: 35.714,
            longitude: 139.4256,
            latitudeDelta: 0.0461,
            longitudeDelta: 0.021,
          }}
        />
        <StatusBar style="auto" />
      </View> */}
    </>
  );
};
