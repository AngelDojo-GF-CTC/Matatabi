import {
  createSpot,
  createTravel,
  createTravelUser,
} from "../../graphql/mutations";
import { listTravels } from "../../graphql/queries";
import { generateUuid } from "../crypto/uuid";
import { execMutate, execQuery } from "./baseApi";
import { getUserById } from "./user";

const createTravelApi = (variables) => execMutate(createTravel, variables);
const createTravelUserApi = (variables) =>
  execMutate(createTravelUser, variables);
const createSpotApi = (variables) => execMutate(createSpot, variables);

export const fetchTravelById = (id) =>
  execQuery(listTravels, { travelId: id }, "listTravels");

export const receiveTravelProject = async (travelData, userId) => {
  try {
    // 既に登録されていた場合二重管理になってしまうので、既に登録されているかを確認する
    const userData = await getUserById(userId);
    if (userData.travels.items.length) {
      const travels = userData.travels.items.map(
        (travelUser) => travelUser.travel
      );
      if (
        travels.some(
          (travel) => travel.travelName === Object.keys(travelData)[0]
        )
      ) {
        throw new Error("既に登録されている旅行です");
      }
    }
    const travelUserVariables = Object.values(travelData)[0].map((travel) => ({
      userUserId: userId,
      travelTravelId: travel.travelId,
      traveltravelDate: travel.travelDate,
    }));
    await Promise.all([
      ...travelUserVariables.map((v) => createTravelUserApi(v)),
    ]);
  } catch (err) {
    console.log(err);
  }
};
// const travelData = {
//   東京旅行: [
//     {
//       __typename: "Travel",
//       _deleted: null,
//       _lastChangedAt: 1696585406265,
//       _version: 1,
//       createdAt: "2023-10-06T09:43:26.224Z",
//       owner: [Object],
//       ownerId: "37a47a88-9011-7074-4ad7-5063bfef27d4",
//       spots: [Object],
//       travelDate: "2023-10-12",
//       travelId: "2e6a08d2-7f30-4f8b-9716-194f316b0b84",
//       travelName: "東京旅行",
//       updatedAt: "2023-10-06T09:43:26.224Z",
//       users: [Object],
//     },
//     {
//       __typename: "Travel",
//       _deleted: null,
//       _lastChangedAt: 1696585406261,
//       _version: 1,
//       createdAt: "2023-10-06T09:43:26.231Z",
//       owner: [Object],
//       ownerId: "37a47a88-9011-7074-4ad7-5063bfef27d4",
//       spots: [Object],
//       travelDate: "2023-10-13",
//       travelId: "2e6a08d2-7f30-4f8b-9716-194f316b0b84",
//       travelName: "東京旅行",
//       updatedAt: "2023-10-06T09:43:26.231Z",
//       users: [Object],
//     },
//   ],
// };

export const createTravelProject = async (travelName, userId, values) => {
  const travelId = generateUuid();
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
        spotAddress: value.spotAddress,
        arrivalTime: value.arrivalTime,
        stayTimeMin: value.stayTimeMin || undefined,
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
//       spotAddress: "東京都港区芝公園４丁目２−８ 東京タワー",
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
//       spotAddress: "日本、〒105-0011 東京都港区芝公園４丁目２−８ 東京タワー 2F",
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
//       spotAddress: "東京都墨田区押上１丁目１−２, トウキョウスカイツリー",
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
//       spotAddress:
//         "日本、〒131-0045 東京都墨田区押上１丁目１−２ 東京スカイツリータウン ソラマチ6F",
//       spotId: "ChIJrfccWNaOGGARVhFln5H6kug",
//       spotName: "牛たん炭焼 利久 東京ソラマチ店",
//       stayTimeMin: "",
//       walkingDuration: "10分",
//     },
//   ],
// };

// const travelList = {
//   __typename: "ModelTravelConnection",
//   items: [
//     {
//       __typename: "Travel",
//       _deleted: null,
//       _lastChangedAt: 1696585406265,
//       _version: 1,
//       createdAt: "2023-10-06T09:43:26.224Z",
//       owner: [Object],
//       ownerId: "37a47a88-9011-7074-4ad7-5063bfef27d4",
//       spots: [Object],
//       travelDate: "2023-10-12",
//       travelId: "2e6a08d2-7f30-4f8b-9716-194f316b0b84",
//       travelName: "東京旅行",
//       updatedAt: "2023-10-06T09:43:26.224Z",
//       users: [Object],
//     },
//     {
//       __typename: "Travel",
//       _deleted: null,
//       _lastChangedAt: 1696585406261,
//       _version: 1,
//       createdAt: "2023-10-06T09:43:26.231Z",
//       owner: [Object],
//       ownerId: "37a47a88-9011-7074-4ad7-5063bfef27d4",
//       spots: [Object],
//       travelDate: "2023-10-13",
//       travelId: "2e6a08d2-7f30-4f8b-9716-194f316b0b84",
//       travelName: "東京旅行",
//       updatedAt: "2023-10-06T09:43:26.231Z",
//       users: [Object],
//     },
//   ],
//   nextToken: null,
//   startedAt: null,
// };
