import React, { useCallback, useMemo, useState } from "react";
import { ITINERARY_KEY } from "../constants/itinerary";
import { convertAWSTimeFromDate } from "../utils/date";

export const useItineraryFormParts = (
  values,
  setValue,
  date,
  setAddSpot,
  isEditMode,
  isConfirmMode
) => {
  const value = useMemo(() => {
    return values[date];
  }, [values, date]);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [targetTimeIndex, setTargetTimeIndex] = useState(-1);
  const [isEndpoint, setIsEndPoint] = useState(!!isConfirmMode);

  const showTimePicker = useCallback((index) => {
    setTargetTimeIndex(index);
    setTimePickerVisibility(true);
  }, []);

  const hideTimePicker = useCallback(() => {
    setTimePickerVisibility(false);
  }, []);

  const handleTimeConfirm = useCallback(
    (time) => {
      // console.log(time);
      const result = convertAWSTimeFromDate(time);
      // console.log(result);
      setValue(date, targetTimeIndex, ITINERARY_KEY.arrivalTime, result);
      hideTimePicker();
    },
    [date, targetTimeIndex]
  );

  const handleEndpoint = useCallback(() => {
    const isError = setAddSpot(date);
    if (isError) return;
    setIsEndPoint(true);
  }, [date]);

  return {
    states: { value, isTimePickerVisible, isEndpoint },
    func: { showTimePicker, hideTimePicker, handleTimeConfirm, handleEndpoint },
  };
};
