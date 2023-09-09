import React from "react";
// import { Calendar, LocaleConfig } from "react-native-calendars";
import { useTravelAddForm } from "../../hooks/useTravelAddForm";
import { Box, ScrollView, VStack } from "native-base";
import { LocationSearchBox } from "../molecules/LocationSearchBox";
import { CalendarForm } from "../molecules/CalendarForm";

import moment from "moment";
const INITIAL_DATE = moment().format("YYYY-MM-DD");

export const TravelAddForm = () => {
  const {
    states: { targetDay, markedDates },
    handlers: { handleDayPress, handleTargetStart, handleTargetEnd },
  } = useTravelAddForm(INITIAL_DATE);

  return (
    <ScrollView>
      <VStack space={2} alignItems="center">
        <CalendarForm
          initialDate={INITIAL_DATE}
          targetDay={targetDay}
          markedDates={markedDates}
          handleDayPress={handleDayPress}
          handleTargetStart={handleTargetStart}
          handleTargetEnd={handleTargetEnd}
        />
        {/* <Box>
          <Text>ようこそ新しい旅！！</Text>
        </Box>
        <View style={{ padding: 10, width: "100%" }}>
          <Calendar
            markingType="period"
            monthFormat={"yyyy年 MM月"}
            current={INITIAL_DATE}
            markedDates={markedDates}
            onDayPress={handleDayPress}
          />
        </View> */}
        <LocationSearchBox />
        {/* 仮の余白 */}
        <Box height={200} />
      </VStack>
    </ScrollView>
  );
};
