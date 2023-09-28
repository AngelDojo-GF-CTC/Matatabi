import { createRef, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { color } from "../styles/color";
import moment from "moment";

export const useTravelAddForm = (INITIAL_DATE, handleResetPage) => {
  const [selected, setSelected] = useState({
    start: "",
    end: "",
  });
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
      if (!selected.start)
        return Alert.alert("入力エラー", "旅の開始日付を選択してください");
      if (!selected.end)
        return Alert.alert("入力エラー", "旅の終了日付を選択してください");
    }
    setStep((prev) => prev + 1);
  }, [selected, step]);

  const handlePrevStep = useCallback(() => {
    step === 0 ? handleResetPage() : setStep((prev) => prev - 1);
  }, [step]);

  const handleLocationAddPress = useCallback((data, details) => {
    console.log(data, details);
    const spotName = data.structured_formatting.main_text;
    console.log("スポット名： ", spotName);
    const spotAddress = data.description.split("、")[1];
    console.log("住所： ", spotAddress);
    if (!spotAddress) {
      return Alert.alert(
        "入力タイプエラー",
        "住所が特定できないスポットです。"
      );
    }
    setLocations((prev) => [...prev, { spotName, spotAddress }]);
  }, []);

  const handleDeleteLocation = useCallback((item) => {
    console.log("delete");
    setLocations((prev) =>
      prev.filter((location) => location.spotAddress !== item.spotAddress)
    );
  }, []);

  return {
    states: { step, targetDay, markedDates, locations },
    handlers: {
      handleDeleteLocation,
      handleNextStep,
      handlePrevStep,
      handleDayPress,
      handleTargetStart,
      handleTargetEnd,
      handleLocationAddPress,
    },
  };
};
