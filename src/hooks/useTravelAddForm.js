import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { color } from "../styles/color";
import moment from "moment";
import { ERROR_MESSAGE, ERROR_TYPE } from "../constants/error";

export const useTravelAddForm = (handleResetPage) => {
  const [selected, setSelected] = useState({
    start: "",
    end: "",
  });
  const [travelName, setTravelName] = useState("");
  const [targetDay, setTargetDay] = useState({ start: true, end: false });
  const [markedDates, setMarkedDates] = useState({});
  const [step, setStep] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (selected.start === selected.end) {
      return setMarkedDates({
        [selected.start]: {
          startingDay: true,
          endingDay: true,
          color: color.add,
          textColor: "white",
        },
      });
    }
    let between = {};
    const days = moment(selected.end).diff(moment(selected.start), "days") - 1;
    for (let i = 0; i < days; i++) {
      const day = moment(selected.start)
        .add(i + 1, "days")
        .format("YYYY-MM-DD");
      between = {
        ...between,
        [day]: { color: color.add, textColor: "white" },
      };
    }
    setMarkedDates({
      [selected.start]: {
        startingDay: true,
        color: color.add,
        textColor: "white",
      },
      ...between,
      [selected.end]: {
        endingDay: true,
        color: color.add,
        textColor: "white",
      },
    });
  }, [selected]);
  const handleDayPress = useCallback(
    (day) => {
      // TODO: 過去の日程は選択できないようにする
      setSelected((prev) => {
        return {
          start: targetDay.start ? day.dateString : prev.start,
          end: targetDay.end ? day.dateString : prev.end,
        };
      });

      setTargetDay((prev) => {
        return {
          start: !prev.start,
          end: !prev.end,
        };
      });
    },
    [targetDay]
  );

  const handleTargetStart = useCallback(() => {
    setTargetDay({ start: true, end: false });
  }, []);

  const handleTargetEnd = useCallback(() => {
    setTargetDay({ start: false, end: true });
  }, []);

  const handleNextStep = useCallback(() => {
    if (step === 0) {
      if (!travelName)
        return Alert.alert(
          ERROR_TYPE.inputError,
          ERROR_MESSAGE.travelNameError
        );
      if (!selected.start)
        return Alert.alert(ERROR_TYPE.inputError, ERROR_MESSAGE.startDaysError);
      if (!selected.end)
        return Alert.alert(ERROR_TYPE.inputError, ERROR_MESSAGE.endDaysError);
    }
    setStep((prev) => prev + 1);
  }, [selected, step, travelName]);

  const handlePrevStep = useCallback(() => {
    step === 0 ? handleResetPage() : setStep((prev) => prev - 1);
  }, [step]);

  const handleLocationAddPress = useCallback((data, details) => {
    // console.log(data, details);
    const spotId = data.place_id;
    const spotName = data.structured_formatting.main_text;
    const spotAddress = data.description.split("、")[1];
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    // console.log({ spotName, spotAddress, spotId, lat, lng });
    if (!spotAddress) {
      return Alert.alert(ERROR_TYPE.inputError, ERROR_MESSAGE.addressNotFound);
    }
    setLocations((prev) => [
      ...prev,
      { spotName, spotAddress, spotId, lat, lng },
    ]);
  }, []);

  const handleDeleteLocation = useCallback((item) => {
    console.log("delete");
    setLocations((prev) =>
      prev.filter((location) => location.spotAddress !== item.spotAddress)
    );
  }, []);

  const handleTravelName = useCallback((name) => {
    setTravelName(name);
  }, []);

  return {
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
  };
};
