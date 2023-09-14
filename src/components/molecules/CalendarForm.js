import React from "react";
import { Box, Text, View, HStack, Tooltip, Button } from "native-base";
import { Calendar } from "react-native-calendars";

export const CalendarForm = ({
  initialDate,
  targetDay,
  markedDates,
  handleDayPress,
  handleTargetStart,
  handleTargetEnd,
}) => {
  return (
    <>
      <Box>
        <Text fontSize="md">ようこそ新しい旅！！</Text>
      </Box>
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
    </>
  );
};
