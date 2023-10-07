import React from "react";
import {
  Button,
  HStack,
  Text,
  View,
  Input,
  VStack,
  Divider,
  SearchIcon,
  Center,
} from "native-base";
import { AddButton } from "../atoms/Buttons/AddButton";
import { ITINERARY_KEY, ITINERARY_LABEL } from "../../constants/itinerary";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from "../../styles/color";
import { useItineraryFormParts } from "../../hooks/useItineraryFormParts";
import { convertTimeFromAWSTime } from "../../utils/date";
import { ImageBox } from "./ImageBox";

export const ItineraryFormParts = ({
  values,
  setValue,
  date,
  formConfig,
  setAddSpot,
  showSpotModal,
  isEndDays,
  isEditMode,
  isConfirmMode,
  isDetailMode,
  handleSpotPress,
}) => {
  const {
    states: { value, isTimePickerVisible, isEndpoint },
    func: { showTimePicker, hideTimePicker, handleTimeConfirm, handleEndpoint },
  } = useItineraryFormParts(
    values,
    setValue,
    date,
    setAddSpot,
    isEditMode,
    isConfirmMode
  );

  return (
    <>
      {value &&
        formConfig &&
        value.length === formConfig.length &&
        value?.map((val, index) => (
          <View key={index} mt={10}>
            <HStack space={10}>
              <View>
                <VStack>
                  <Button
                    w={20}
                    m={0.5}
                    size="md"
                    onPress={() => showTimePicker(index)}
                    backgroundColor={"gray.200"}
                    _text={{ color: color.text }}
                    disabled={!isEditMode}
                  >
                    {val[ITINERARY_KEY.arrivalTime]
                      ? convertTimeFromAWSTime(val[ITINERARY_KEY.arrivalTime])
                      : ITINERARY_LABEL[ITINERARY_KEY.arrivalTime]}
                  </Button>
                </VStack>
              </View>
              <View>
                <VStack>
                  <Button
                    w={"80%"}
                    m={0.5}
                    endIcon={!val.spotName && <SearchIcon color={"white"} />}
                    onPress={() => {
                      if (isEditMode) {
                        showSpotModal(date, index);
                      } else if (isDetailMode) {
                        handleSpotPress(val.lat, val.lng);
                      }
                    }}
                    backgroundColor={color.add}
                    disabled={!(isEditMode || isDetailMode)}
                    _text={{ color: "white" }}
                  >
                    {val.spotName ||
                      `${ITINERARY_LABEL[ITINERARY_KEY.spotName]}を選択`}
                  </Button>
                </VStack>
              </View>
            </HStack>
            {isEndpoint && index === value.length - 1 ? (
              <View h={0} />
            ) : (
              <HStack ml={0.25} space={20}>
                <Divider
                  h={isEndDays && isEndpoint ? "160%" : "400%"}
                  ml={10}
                  mt={-0.5}
                  orientation="vertical"
                  _light={{
                    bg: "muted.800",
                  }}
                  _dark={{
                    bg: "muted.50",
                  }}
                  zIndex={-1}
                />

                <VStack marginTop={3}>
                  <HStack>
                    <Text margin={2}>{`${
                      ITINERARY_LABEL[ITINERARY_KEY.stayTimeMin]
                    }：`}</Text>
                    <VStack>
                      {isEditMode ? (
                        <Input
                          w={20}
                          size="md"
                          value={val.stayTimeMin.toString()}
                          onChangeText={(text) =>
                            setValue(
                              date,
                              index,
                              ITINERARY_KEY.stayTimeMin,
                              text
                            )
                          }
                        />
                      ) : (
                        <Text m={2}>{val.stayTimeMin}</Text>
                      )}
                    </VStack>
                    <Text m={2}>分</Text>
                  </HStack>
                  <HStack margin={2}>
                    {(value[index + 1]?.drivingDuration ||
                      value[index + 1]?.walkingDuration) && (
                      <Text>移動時間：</Text>
                    )}

                    {value[index + 1]?.drivingDuration && (
                      <Text textAlign={"center"} color={color.text}>{`車　${
                        value[index + 1]?.drivingDuration
                      }`}</Text>
                    )}
                    {value[index + 1]?.drivingDuration &&
                      value[index + 1]?.walkingDuration && (
                        <Text textAlign={"center"} color={color.text}>
                          {` / `}
                        </Text>
                      )}
                    {value[index + 1]?.walkingDuration && (
                      <Text color={color.text} textAlign={"center"}>{`歩　${
                        value[index + 1]?.walkingDuration
                      }`}</Text>
                    )}
                  </HStack>
                  <ImageBox />
                </VStack>
              </HStack>
            )}
          </View>
        ))}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        date={new Date()}
        onConfirm={(time) => handleTimeConfirm(time)}
        onCancel={hideTimePicker}
      />

      {!isEndpoint && isEditMode && (
        <VStack>
          <View mt={10} mb={10} w={20}>
            <Center>
              <AddButton
                backgroundColor={color.accent}
                borderRadius={"full"}
                _icon={{
                  color: "white",
                }}
                // _text={{ color: color.text }}
                onPress={() => setAddSpot(date)}
              >
                {/* 次 */}
              </AddButton>
            </Center>
          </View>
          <View mt={10} w={20}>
            <Button
              backgroundColor={"gray.200"}
              _text={{ color: color.text }}
              onPress={handleEndpoint}
            >
              最終地点
            </Button>
          </View>
        </VStack>
      )}
    </>
  );
};
