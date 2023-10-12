import React from "react";
import { VStack, Button, AddIcon, Box, Text, ScrollView } from "native-base";
import { color } from "../../styles/color";
import { ShareButton } from "../atoms/Buttons/ShareButton";

export const TravelList = ({
  travelList,
  handleTravelPress,
  handleSharePress,
  handleAddFormMode,
}) => {
  return (
    <ScrollView bgColor={"white"} w={"100%"} h={"100%"}>
      <VStack space={2} alignItems="center">
        <Box w={"80%"} m={30}>
          <Button
            startIcon={<AddIcon />}
            width={"100%"}
            backgroundColor={color.add}
            onPress={handleAddFormMode}
          >
            新しい旅の登録
          </Button>
        </Box>
        {/* TODO: 次の旅 */}
        {/* TODO: 過去の旅 */}
        {travelList &&
          Object.keys(travelList).map((travelName, id) => (
            <Box w={"80%"} m={2} key={id} style={{ position: "relative" }}>
              <Button
                width={"100%"}
                backgroundColor={color.gray}
                p={2}
                onPress={() => handleTravelPress(travelName)}
              >
                <Text bold fontSize={20} color={color.grayText}>
                  {travelName}
                </Text>
                <Text bold fontSize={13} color={color.grayText}>
                  {`${travelList[travelName][0].travelDate} 〜 ${
                    travelList[travelName][travelList[travelName].length - 1]
                      .travelDate
                  }`}
                </Text>
              </Button>
              <ShareButton
                style={{ position: "absolute", bottom: 0, right: 0 }}
                onPress={() => handleSharePress(travelName)}
              />
            </Box>
          ))}
      </VStack>
    </ScrollView>
  );
};
