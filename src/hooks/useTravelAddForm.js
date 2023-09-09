import { useCallback, useEffect, useState } from "react";
import { color } from "../styles/color";
import moment from "moment";

export const useTravelAddForm = (INITIAL_DATE) => {
  const [selected, setSelected] = useState({
    start: "",
    end: "",
  });
  const [targetDay, setTargetDay] = useState({ start: true, end: false });
  const [markedDates, setMarkedDates] = useState({});

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

  return {
    states: { targetDay, markedDates },
    handlers: { handleDayPress, handleTargetStart, handleTargetEnd },
  };
};
