import React, { useEffect, useState } from "react";
import { getUserById } from "../service/appsync/user";
import { useRecoilValue } from "recoil";
import { myUserIdState } from "../recoil/atoms";
import { groupsArrayByKey } from "../utils/array";
import { TRAVEL_KEY } from "../constants/itinerary";

export const useTravelList = (handleTravelDetailMode, pageMode) => {
  const userId = useRecoilValue(myUserIdState);
  const [travelList, setTravelList] = useState();
  const [targetTravelName, setTargetTravelName] = useState();
  const [targetTravelData, setTargetTravelData] = useState();

  useEffect(() => {
    if (!userId || !pageMode?.listMode) return;
    (async () => {
      const userData = await getUserById(userId);
      const travels = userData.travels.items.map(
        (travelUser) => travelUser.travel
      );
      // console.log("travels: ", travels);
      const list = groupsArrayByKey(
        travels,
        TRAVEL_KEY.travelName,
        TRAVEL_KEY.travelDate
      );
      // console.log("list: ", list);
      setTravelList(list);
    })();
  }, [userId, pageMode?.listMode]);

  const handleTravelPress = (travelName) => {
    setTargetTravelName(travelName);
    setTargetTravelData(travelList[travelName]);
    handleTravelDetailMode();
  };
  return {
    state: { travelList, targetTravelName, targetTravelData },
    handlers: { handleTravelPress },
  };
};

// const list = {
//   京都旅行: [
//     {
//       owner: [Object],
//       ownerId: "87449a88-10d1-70eb-55b1-7dfdd0247d46",
//       spots: [Object],
//       travelDate: "2023-10-26",
//       travelId: "1e659578-ab93-4ad8-a42c-48f8c4e5ea60",
//       travelName: "京都旅行",
//     },
//     {
//       owner: [Object],
//       ownerId: "87449a88-10d1-70eb-55b1-7dfdd0247d46",
//       spots: [Object],
//       travelDate: "2023-10-27",
//       travelId: "1e659578-ab93-4ad8-a42c-48f8c4e5ea60",
//       travelName: "京都旅行",
//     },
//   ],
//   東京旅行: [
//     {
//       owner: [Object],
//       ownerId: "87449a88-10d1-70eb-55b1-7dfdd0247d46",
//       spots: [Object],
//       travelDate: "2023-10-25",
//       travelId: "ed9fb39d-41ae-4c9b-ad9b-b29a910fe908",
//       travelName: "東京旅行",
//     },
//     {
//       owner: [Object],
//       ownerId: "87449a88-10d1-70eb-55b1-7dfdd0247d46",
//       spots: [Object],
//       travelDate: "2023-10-26",
//       travelId: "ed9fb39d-41ae-4c9b-ad9b-b29a910fe908",
//       travelName: "東京旅行",
//     },
//   ],
// };
