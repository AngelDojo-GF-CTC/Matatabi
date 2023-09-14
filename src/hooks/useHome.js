import React, { useCallback, useState } from "react";

export const useHome = () => {
  const [pageMode, setPageMode] = useState({
    listMode: true,
    addFormMode: false,
    travelDetailMode: false,
  });
  const [count, setCount] = useState(0);
  const handleAddFormMode = useCallback(() => {
    setPageMode({
      listMode: false,
      addFormMode: true,
      travelDetailMode: false,
    });
  }, []);

  const handleTravelDetailMode = useCallback(() => {
    setPageMode({
      listMode: false,
      addFormMode: false,
      travelDetailMode: true,
    });
  }, []);

  const handleResetPage = useCallback(() => {
    setPageMode({
      listMode: true,
      addFormMode: false,
      travelDetailMode: false,
    });
  }, []);

  return {
    states: {
      pageMode,
      count,
    },
    handlers: {
      handleAddFormMode,
      handleResetPage,
    },
  };
};
