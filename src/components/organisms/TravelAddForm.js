import React from "react";
// import { Calendar, LocaleConfig } from "react-native-calendars";
import { useTravelAddForm } from "../../hooks/useTravelAddForm";
import { Box, HStack, ScrollView, VStack, View } from "native-base";
import { LocationSearchBox } from "../molecules/LocationSearchBox";
import { CalendarForm } from "../molecules/CalendarForm";

import moment from "moment";
import { BackButton } from "../atoms/Buttons/BackButton";
import { NextButton } from "../atoms/Buttons/NextButton";
const INITIAL_DATE = moment().format("YYYY-MM-DD");

export const TravelAddForm = ({ handleResetPage }) => {
  const {
    states: { step, targetDay, markedDates },
    handlers: {
      handleNextStep,
      handlePrevStep,
      handleDayPress,
      handleTargetStart,
      handleTargetEnd,
    },
  } = useTravelAddForm(INITIAL_DATE, handleResetPage);

  return (
    <>
      <HStack
        position="fixed"
        marginLeft={10}
        marginRight={10}
        top={440}
        justifyContent="space-between"
        alignItems="center"
        zIndex={1}
      >
        <BackButton
          onPress={handlePrevStep}
          variant={"solid"}
          borderRadius="full"
        />
        <NextButton
          onPress={handleNextStep}
          variant={"solid"}
          borderRadius="full"
        />
      </HStack>
      <VStack alignItems="center" marginTop={-8}>
        {step === 0 ? (
          <CalendarForm
            initialDate={INITIAL_DATE}
            targetDay={targetDay}
            markedDates={markedDates}
            handleDayPress={handleDayPress}
            handleTargetStart={handleTargetStart}
            handleTargetEnd={handleTargetEnd}
          />
        ) : step === 1 ? (
          <LocationSearchBox />
        ) : (
          <></>
        )}
      </VStack>
    </>
  );
};
