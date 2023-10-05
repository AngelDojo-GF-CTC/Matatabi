import React from "react";
import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
  Modal,
  Text,
  VStack,
  View,
} from "native-base";
import { TouchableOpacity } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_API_KEY } from "@env";
import { color } from "../../styles/color";

export const LocationSelectModal = ({
  isSpotModal,
  hideSpotModal,
  selectSpotsMenu,
  // searchRef,
  // handleLocationSelectPress,
  handleSpotSave,
  // setZIndex,
  zIndex,
  currentSpotName,
}) => {
  return (
    <Modal isOpen={isSpotModal} onClose={hideSpotModal} size={"xl"}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Center>滞在スポットを選択</Center>
        </Modal.Header>
        <Modal.Body h={selectSpotsMenu.length * 100 + 500}>
          {/* <View
            style={{
              height: "100%",
              width: "100%",
            }}
            zIndex={zIndex * -100000}
          >
            <GooglePlacesAutocomplete
              ref={searchRef}
              placeholder="行きたいスポットを検索"
              onFail={(err) => {
                console.log(err);
              }}
              fetchDetails={false}
              onPress={(data, details = null) => {
                console.log(data);
                handleLocationAddPress(data, details);
              }}
              textInputProps={{
                onFocus: () => {
                  searchRef.current.clear();
                  setZIndex(-1);
                },
                onBlur: () => {
                  setZIndex(1);
                },
              }}
              query={{
                key: GOOGLE_API_KEY,
                language: "ja",
                components: "country:jp",
              }}
            />
          </View> */}
          <View mt={2} zIndex={zIndex}>
            <Center>
              <Container>
                <VStack>
                  <Text mt={3} mb={3} fontWeight="medium">
                    次のスポットをタップして選択
                  </Text>
                  <Heading>次の行先は？</Heading>
                  {currentSpotName.current && (
                    <Text mt={3} fontWeight="medium">
                      {`前のスポット：${currentSpotName.current}`}
                    </Text>
                  )}
                  {selectSpotsMenu?.map((spot, id) => (
                    <View key={id} mt={3}>
                      <TouchableOpacity
                        onPress={(e) => handleSpotSave(e, spot)}
                      >
                        <Box
                          borderRadius={"xl"}
                          w={"100%"}
                          // h={20}
                          m={2}
                          // backgroundColor={color.add}
                          borderColor={color.border}
                          borderWidth={2}
                        >
                          <Center>
                            <Text textAlign={"center"} color={color.text}>
                              {spot.description}
                            </Text>
                            <Heading textAlign={"center"} color={color.text}>
                              {spot.spotName}
                            </Heading>
                            <HStack>
                              {spot.drivingDuration && (
                                <Text
                                  textAlign={"center"}
                                  color={color.text}
                                >{`車　${spot.drivingDuration}`}</Text>
                              )}
                              {spot.drivingDuration && spot.walkingDuration && (
                                <Text textAlign={"center"} color={color.text}>
                                  　/　
                                </Text>
                              )}
                              {spot.walkingDuration && (
                                <Text
                                  color={color.text}
                                  textAlign={"center"}
                                >{`歩　${spot.walkingDuration}`}</Text>
                              )}
                            </HStack>
                          </Center>
                        </Box>
                      </TouchableOpacity>
                    </View>
                  ))}
                </VStack>
              </Container>
            </Center>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
