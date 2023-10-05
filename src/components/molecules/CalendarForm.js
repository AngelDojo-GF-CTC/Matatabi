import React from "react";
import {
  Box,
  Text,
  View,
  HStack,
  Button,
  VStack,
  Center,
  Input,
  ScrollView,
} from "native-base";
import { Calendar } from "react-native-calendars";

export const CalendarForm = ({
  travelName,
  handleTravelName,
  initialDate,
  targetDay,
  markedDates,
  handleDayPress,
  handleTargetStart,
  handleTargetEnd,
}) => {
  return (
    <ScrollView w={"100%"}>
      <VStack w={"100%"}>
        <Center m={2}>
          <Text fontSize="md">ようこそ新しい旅！！</Text>
          <Input
            w={"80%"}
            size="2xl"
            placeholder="旅行名を入力してください"
            bgColor={"white"}
            value={travelName || ""}
            onChangeText={(text) => handleTravelName(text)}
          />
        </Center>

        <HStack justifyContent="center" space={20}>
          <Button
            variant={targetDay.start ? "solid" : "outline"}
            onPress={handleTargetStart}
          >
            開始日付
          </Button>
          <Button
            variant={targetDay.end ? "solid" : "outline"}
            onPress={handleTargetEnd}
          >
            終了日付
          </Button>
        </HStack>

        <View style={{ padding: 10, width: "100%" }}>
          <Calendar
            markingType="period"
            monthFormat={"yyyy年 MM月"}
            current={initialDate}
            markedDates={markedDates}
            onDayPress={handleDayPress}
          />
        </View>
      </VStack>
    </ScrollView>
  );
};
