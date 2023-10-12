import React from "react";
import { useTravelAddForm } from "../../hooks/useTravelAddForm";
import { HStack, VStack } from "native-base";
import { LocationSearchBox } from "../molecules/LocationSearchBox";
import { CalendarForm } from "../molecules/CalendarForm";
import { Itinerary } from "./Itinerary";
import { BackButton } from "../atoms/Buttons/BackButton";
import { NextButton } from "../atoms/Buttons/NextButton";
import moment from "moment";
import { useItinerary } from "../../hooks/useItinerary";
const INITIAL_DATE = moment().format("YYYY-MM-DD");

export const TravelAddForm = ({ handleResetPage }) => {
  const {
    states: { step, targetDay, markedDates, locations, travelName },
    handlers: {
      handleDeleteLocation,
      handleNextStep,
      handlePrevStep,
      handleDayPress,
      handleTargetStart,
      handleTargetEnd,
      handleLocationAddPress,
      handleTravelName,
    },
  } = useTravelAddForm(handleResetPage);
  const {
    states: { values, formConfig, isSpotModal, selectSpotsMenu, zIndex },
    refs: { /*searchRef,*/ currentSpotName },
    func: {
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
    },
  } = useItinerary(
    markedDates,
    locations,
    travelName,
    handleResetPage,
    undefined
  );

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
        <>
          <BackButton
            onPress={handlePrevStep}
            variant={"solid"}
            borderRadius="full"
          />
          {step <= 2 ? (
            <NextButton
              onPress={handleNextStep}
              variant={"solid"}
              borderRadius="full"
            />
          ) : (
            <></>
          )}
        </>
      </HStack>

      <VStack alignItems="center" marginTop={-10}>
        {step === 0 ? (
          <CalendarForm
            travelName={travelName}
            handleTravelName={handleTravelName}
            initialDate={INITIAL_DATE}
            targetDay={targetDay}
            markedDates={markedDates}
            handleDayPress={handleDayPress}
            handleTargetStart={handleTargetStart}
            handleTargetEnd={handleTargetEnd}
          />
        ) : step === 1 ? (
          <LocationSearchBox
            handleLocationAddPress={handleLocationAddPress}
            handleDeleteLocation={handleDeleteLocation}
            locations={locations}
          />
        ) : step === 2 ? (
          <Itinerary
            {...{
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
            }}
            isEditMode
          />
        ) : (
          <Itinerary
            {...{
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
            }}
            isConfirmMode
          />
        )}
      </VStack>
    </>
  );
};
