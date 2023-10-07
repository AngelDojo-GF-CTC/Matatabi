import React from "react";
import { ItineraryFormParts } from "../molecules/ItineraryFormParts";
import { Button, Center, Container, Text, VStack, View } from "native-base";
// import { useItinerary } from "../../hooks/useItinerary";
// import { Button } from "@aws-amplify/ui-react-native/dist/primitives";
// import { color } from "../../styles/color";
import { ScrollView } from "react-native";
import { LocationSelectModal } from "../molecules/LocationSelectModal";

// TODO: 閲覧と作成どっちもで使い回しできるように作成
export const Itinerary = ({
  travelName,
  values,
  formConfig,
  isSpotModal,
  selectSpotsMenu,
  zIndex,
  // searchRef,
  currentSpotName,
  setValue,
  setAddSpot,
  showSpotModal,
  // handleErrorCheck,
  // handleConfirmClick,
  hideSpotModal,
  // handleLocationSelectPress,
  handleSpotSave,
  // setZIndex,
  handleSubmit,
  locations,
  isEditMode,
  isConfirmMode,
}) => {
  return (
    <>
      <ScrollView>
        <VStack>
          {isConfirmMode && (
            <Center mt={5}>
              <Text bold fontSize={"md"}>
                以下の内容で登録します。
              </Text>
              <Text mt={5} bold fontSize={"xl"}>
                {`${travelName}`}
              </Text>
            </Center>
          )}
          {values &&
            formConfig &&
            Object.keys(values).map((date, index) => (
              <React.Fragment key={index}>
                <Center
                  _text={{
                    fontSize: "lg",
                    fontWeight: "bold",
                  }}
                  mt={5}
                >
                  {date}
                </Center>
                <ItineraryFormParts
                  values={values}
                  setValue={setValue}
                  date={date}
                  formConfig={formConfig[date]}
                  locations={locations}
                  setAddSpot={setAddSpot}
                  showSpotModal={showSpotModal}
                  isEndDays={Object.keys(values).length === Number(index + 1)}
                  isEditMode={isEditMode}
                />
              </React.Fragment>
            ))}
          <Center>
            <Container h={400}>
              <View mt={10}>
                {isConfirmMode && <Button onPress={handleSubmit}>登録</Button>}
              </View>
            </Container>
          </Center>
        </VStack>
      </ScrollView>
      <LocationSelectModal
        {...{
          isSpotModal,
          hideSpotModal,
          selectSpotsMenu,
          // searchRef,
          // handleLocationSelectPress,
          handleSpotSave,
          // setZIndex,
          zIndex,
          currentSpotName,
        }}
      />
    </>
  );
};
