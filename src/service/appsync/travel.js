import {
  createSpot,
  createTravel,
  createTravelUser,
} from "../../graphql/mutations";
import { execMutate, execQuery } from "./baseApi";
import "react-native-get-random-values";
import { v4 } from "uuid";

const createTravelApi = (variables) => execMutate(createTravel, variables);
const createTravelUserApi = (variables) =>
  execMutate(createTravelUser, variables);
const createSpotApi = (variables) => execMutate(createSpot, variables);

export const createTravelProject = async (travelName, userId, values) => {
  const travelId = v4();
  // console.log(travelId);
  const travelVariables = Object.keys(values).map((date) => ({
    travelId: travelId,
    travelDate: date,
    travelName: travelName,
    ownerId: userId,
  }));
  const travelUserVariables = Object.keys(values).map((date) => ({
    userUserId: userId,
    travelTravelId: travelId,
    traveltravelDate: date,
  }));
  let spotVariables = [];
  for (const date in values) {
    for (const value of values[date]) {
      spotVariables.push({
        travelId: travelId,
        travelDate: date,
        spotId: value.spotId,
        spotName: value.spotName,
        spotAddress: value.spitAddress,
        arrivalTime: value.arrivalTime,
        stayTimeMin: value.stayTimeMin || 0,
        walkingDuration: value.walkingDuration || "",
        drivingDuration: value.drivingDuration || "",
        lat: value.lat,
        lng: value.lng,
      });
    }
  }
  await Promise.all([
    ...travelVariables.map((v) => createTravelApi(v)),
    ...travelUserVariables.map((v) => createTravelUserApi(v)),
    ...spotVariables.map((v) => createSpotApi(v)),
  ]);
};
// values = {
//   "2023-10-26": [
//     {
//       arrivalTime: "10:24:00.000Z",
//       drivingDuration: "",
//       lat: 35.6585805,
//       lng: 139.7454329,
//       spitAddress: "東京都港区芝公園４丁目２−８ 東京タワー",
//       spotId: "ChIJCewJkL2LGGAR3Qmk0vCTGkg",
//       spotName: "東京タワー",
//       stayTimeMin: "100",
//       walkingDuration: "",
//     },
//     {
//       arrivalTime: "13:24:00.000Z",
//       drivingDuration: "1分",
//       lat: 35.6585696,
//       lng: 139.745484,
//       spitAddress: "日本、〒105-0011 東京都港区芝公園４丁目２−８ 東京タワー 2F",
//       spotId: "ChIJN2D06d6LGGARyz8lzMkN8Y4",
//       spotName: "生パスタ専門店SPALA 東京タワー店",
//       stayTimeMin: "",
//       walkingDuration: "1分",
//     },
//   ],
//   "2023-10-27": [
//     {
//       arrivalTime: "10:24:00.000Z",
//       drivingDuration: "",
//       lat: 35.71006269999999,
//       lng: 139.8107004,
//       spitAddress: "東京都墨田区押上１丁目１−２, トウキョウスカイツリー",
//       spotId: "ChIJ35ov0dCOGGARKvdDH7NPHX0",
//       spotName: "トウキョウスカイツリー",
//       stayTimeMin: "50",
//       walkingDuration: "",
//     },
//     {
//       arrivalTime: "13:24:00.000Z",
//       drivingDuration: "3分",
//       lat: 35.7102538,
//       lng: 139.8124786,
//       spitAddress:
//         "日本、〒131-0045 東京都墨田区押上１丁目１−２ 東京スカイツリータウン ソラマチ6F",
//       spotId: "ChIJrfccWNaOGGARVhFln5H6kug",
//       spotName: "牛たん炭焼 利久 東京ソラマチ店",
//       stayTimeMin: "",
//       walkingDuration: "10分",
//     },
//   ],
// };
