import React from "react";
import { Text } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useTravelAddForm } from "../../hooks/useTravelAddForm";
import { View, VStack } from "native-base";
import { LocationSearchBox } from "../molecules/LocationSearchBox";
import moment from "moment";
const INITIAL_DATE = moment().format("YYYY-MM-DD");

export const TravelAddForm = () => {
  const {
    states: { markedDates },
    handlers: { handleDayPress },
  } = useTravelAddForm(INITIAL_DATE);

  return (
    <VStack space={2} alignItems="center">
      <View style={{ padding: 10, width: "100%" }}>
        <Calendar
          markingType="period"
          monthFormat={"yyyy年 MM月"}
          current={INITIAL_DATE}
          markedDates={markedDates}
          onDayPress={handleDayPress}
        />
      </View>
      <LocationSearchBox />
    </VStack>
  );
};
