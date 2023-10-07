import React, { createRef, useState } from "react";
import { View, Box, Text, VStack, HStack, FlatList } from "native-base";
import { DeleteButton } from "../atoms/Buttons/DeleteButton";
import { GOOGLE_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export const LocationSearchBox = ({
  handleLocationAddPress,
  locations,
  handleDeleteLocation,
}) => {
  const [zindexValue, setZindexValue] = useState(-1);
  const searchRef = createRef();

  return (
    <>
      <View
        style={{
          padding: 10,
          height: "100%",
          width: "100%",
          marginTop: 12,
        }}
      >
        <Text fontSize="md" marginBottom="1rem">
          ここだけは外せないスポットを選ぼう！
        </Text>
        <View
          style={{
            height: "30%",
            width: "100%",
          }}
        >
          <GooglePlacesAutocomplete
            ref={searchRef}
            placeholder="行きたいスポットを検索"
            //
            fetchDetails={true}
            onFail={(err) => {
              console.log(err);
            }}
            onPress={(data, details = null) => {
              handleLocationAddPress(data, details);
              // searchRef.current.clear();
            }}
            textInputProps={{
              onFocus: () => {
                setZindexValue(-1);
                searchRef.current.clear();
              },
              onBlur: () => {
                setZindexValue(1);
              },
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "ja",
              components: "country:jp",
            }}
          />
        </View>
        <View
          style={{
            marginTop: -180,
            zIndex: zindexValue,
            height: "50%",
            width: "100%",
          }}
        >
          {locations?.length > 0 && (
            <Box
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <FlatList
                style={{
                  width: "100%",
                  height: "100%",
                }}
                data={locations}
                renderItem={({ item }) => (
                  <Box
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: "muted.50",
                    }}
                    borderColor="muted.800"
                    pl={["0", "4"]}
                    pr={["0", "5"]}
                    py="2"
                  >
                    <HStack space={[1, 3]} justifyContent="space-between">
                      <VStack
                        style={{
                          width: "85%",
                        }}
                      >
                        <Text fontSize="xl" bold color="gray.600">
                          {item.spotName}
                        </Text>
                        <Text fontSize="xs">{item.spotAddress}</Text>
                      </VStack>
                      <DeleteButton
                        style={{ zIndex: 1 }}
                        onPress={() => handleDeleteLocation(item)}
                      />
                    </HStack>
                  </Box>
                )}
              />
            </Box>
          )}
        </View>
      </View>
    </>
  );
};
