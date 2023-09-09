import { useCallback, useEffect, useState } from "react";
import moment from "moment";

export const useTravelAddForm = (INITIAL_DATE) => {
  const [selected, setSelected] = useState({
    start: moment(INITIAL_DATE),
    end: moment(INITIAL_DATE),
  });
  const [targetDay, setTargetDay] = useState({ start: true, end: false });

  const [markedDates, setMarkedDates] = useState({});
  useEffect(() => {
    let between = {};
    const days = moment(selected.end).diff(moment(selected.start), "days") - 1;
    console.log("start: ", selected.start);
    console.log("end: ", selected.end);
    console.log("days: ", days);
    for (let i = 0; i < days; i++) {
      const day = moment(selected.start)
        .add(i + 1, "days")
        .format("YYYY-MM-DD");
      console.log("day: ", day);
      between = {
        ...between,
        [day]: { color: "#70d7c7", textColor: "white" },
      };
    }
    console.log(between);
    setMarkedDates({
      [selected.start]: {
        startingDay: true,
        color: "#50cebb",
        textColor: "white",
      },
      ...between,
      [selected.end]: {
        endingDay: true,
        color: "#50cebb",
        textColor: "white",
      },
    });
  }, [selected]);
  const handleDayPress = useCallback(
    (day) => {
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
    [targetDay, selected]
  );
  return {
    states: { markedDates },
    handlers: { handleDayPress },
  };
};
