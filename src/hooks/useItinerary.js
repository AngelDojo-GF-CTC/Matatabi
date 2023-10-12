import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ITINERARY_KEY, LOCATION_TYPE } from "../constants/itinerary";
import { Alert } from "react-native";
import { ERROR_MESSAGE, ERROR_TYPE } from "../constants/error";
import {
  fetchRouteDurations,
  fetchRecomendedSpots,
} from "../service/appsync/lambdaResolver";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TOAST } from "../constants/toast";
import {
  isMatatabiLoadingState,
  myUserIdState,
  toastDetailsState,
} from "../recoil/atoms";
import { createTravelProject } from "../service/appsync/travel";
import { generateUuid } from "../service/crypto/uuid";

export const useItinerary = (
  dates,
  locations,
  travelName,
  handleResetPage,
  travelData
) => {
  const setIsMatatabiLoading = useSetRecoilState(isMatatabiLoadingState);
  const userId = useRecoilValue(myUserIdState);
  const setToastDetails = useSetRecoilState(toastDetailsState);
  /**
   * @values: {
   *  [date]: {
   *    spotId: ID!
   *    spotName: String!
   *    spotAddress: String!
   *    arrivalTime: String!
   *    stayTimeMin: Int!
   *    drivingDuration
   *    walkingDuration
   *    lat: Float!
   *    lng: Float!
   *  }[],
   *  2023-09-11: {...}[]
   * }
   */
  const [values, setValues] = useState();
  const [formConfig, setFormConfig] = useState();
  const valuesRef = useRef(values);
  const formConfigRef = useRef(formConfig);
  const [targetSpotDate, setTargetSpotDate] = useState();
  const [targetSpotIndex, setTargetSpotIndex] = useState(-1);
  const currentSpotName = useRef("");
  const [isSpotModal, setSpotModal] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  /**
   *  @selectSpotsMenu {
   *    description: "", //=> 事前登録済みスポット or おすすめスポット or 追加スポット
   *    spotId: ""
   *    spotName: "",
   *    spotAddress: "",
   *    drivingDuration: "",
   *    walkingDuration: "",
   *  },
   */
  const [selectSpotsMenu, setSelectSpotsMenu] = useState([]);
  const searchRef = createRef();

  useEffect(() => {
    if (travelData) {
      // const travelData = {
      //   "2023-10-30": [
      //     {
      //       arrivalTime: "10:07:00.000Z",
      //       drivingDuration: "",
      //       lat: 35.6585805,
      //       lng: 139.7454329,
      //       spotAddress: "東京都港区芝公園４丁目２−８ 東京タワー",
      //       spotId: "ChIJCewJkL2LGGAR3Qmk0vCTGkg",
      //       spotName: "東京タワー",
      //       stayTimeMin: 150,
      //       walkingDuration: "",
      //     },
      //     {
      //       arrivalTime: "18:07:00.000Z",
      //       drivingDuration: "1分",
      //       lat: 35.6585696,
      //       lng: 139.745484,
      //       spotAddress:
      //         "日本、〒105-0011 東京都港区芝公園４丁目２−８ 東京タワー 2F",
      //       spotId: "ChIJN2D06d6LGGARyz8lzMkN8Y4",
      //       spotName: "生パスタ専門店SPALA 東京タワー店",
      //       stayTimeMin: 0,
      //       walkingDuration: "1分",
      //     },
      //   ],
      //   "2023-10-31": [
      //     {
      //       arrivalTime: "10:07:00.000Z",
      //       drivingDuration: "",
      //       lat: 35.71006269999999,
      //       lng: 139.8107004,
      //       spotAddress: "東京都墨田区押上１丁目１−２, トウキョウスカイツリー",
      //       spotId: "ChIJ35ov0dCOGGARKvdDH7NPHX0",
      //       spotName: "トウキョウスカイツリー",
      //       stayTimeMin: 120,
      //       walkingDuration: "",
      //     },
      //     {
      //       arrivalTime: "18:07:00.000Z",
      //       drivingDuration: "3分",
      //       lat: 35.7102538,
      //       lng: 139.8124786,
      //       spotAddress:
      //         "日本、〒131-0045 東京都墨田区押上１丁目１−２ 東京スカイツリータウン ソラマチ6F",
      //       spotId: "ChIJrfccWNaOGGARVhFln5H6kug",
      //       spotName: "牛たん炭焼 利久 東京ソラマチ店",
      //       stayTimeMin: 0,
      //       walkingDuration: "10分",
      //     },
      //   ],
      // };
      let result;
      for (const data of travelData) {
        result = {
          ...result,
          [data.travelDate]: [
            ...data.spots.items
              .filter((travel) => travel.travelDate === data.travelDate)
              .map((spot) => ({
                [ITINERARY_KEY.spotId]: spot.spotId,
                [ITINERARY_KEY.spotName]: spot.spotName,
                [ITINERARY_KEY.spotAddress]: spot.spotAddress,
                [ITINERARY_KEY.arrivalTime]: spot.arrivalTime,
                [ITINERARY_KEY.stayTimeMin]: spot.stayTimeMin,
                [ITINERARY_KEY.drivingDuration]: spot.drivingDuration,
                [ITINERARY_KEY.walkingDuration]: spot.walkingDuration,
                [ITINERARY_KEY.lat]: spot.lat,
                [ITINERARY_KEY.lng]: spot.lng,
              })),
          ],
        };
      }
      // console.log(result);
      setValues(result);
    } else {
      let result;
      for (const date in dates) {
        if (dates.hasOwnProperty(date)) {
          result = {
            ...result,
            [date]: [
              {
                [ITINERARY_KEY.spotId]: -1,
                [ITINERARY_KEY.spotName]: "",
                [ITINERARY_KEY.spotAddress]: "",
                [ITINERARY_KEY.arrivalTime]: "",
                [ITINERARY_KEY.stayTimeMin]: "",
                [ITINERARY_KEY.drivingDuration]: "",
                [ITINERARY_KEY.walkingDuration]: "",
                [ITINERARY_KEY.lat]: "",
                [ITINERARY_KEY.lng]: "",
              },
            ],
          };
        }
      }
      setValues(result);
    }
  }, [dates, travelData]);

  useEffect(() => {
    formConfigRef.current = formConfig;
  }, [formConfig]);

  useEffect(() => {
    if (!values) return;
    valuesRef.current = values;
    let result;
    for (const date in values) {
      if (values.hasOwnProperty(date)) {
        result = {
          ...result,
          [date]: values[date].map((val) => {
            return {
              [ITINERARY_KEY.spotId]: {
                required: true,
              },
              [ITINERARY_KEY.spotName]: {
                required: true,
              },
              [ITINERARY_KEY.spotAddress]: {
                required: true,
              },
              [ITINERARY_KEY.arrivalTime]: {
                required: true,
              },
              [ITINERARY_KEY.stayTimeMin]: {
                required: false,
              },
              [ITINERARY_KEY.drivingDuration]: {
                required: false,
              },
              [ITINERARY_KEY.walkingDuration]: { required: false },
              [ITINERARY_KEY.lat]: { required: true },
              [ITINERARY_KEY.lng]: { required: true },
            };
          }),
        };
      }
    }
    setFormConfig(result);
  }, [values]);

  const setValue = useCallback((date, index, key, newValue) => {
    // console.log(date, index, key, newValue);
    setValues((prev) => {
      return {
        ...prev,
        [date]: prev[date].map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: newValue,
            };
          } else {
            return item;
          }
        }),
      };
    });
  }, []);

  const errorCheckFromDateByKey = useCallback(
    (date, key) => {
      let isError = false;
      for (let index = 0; index < valuesRef.current[date].length; index++) {
        if (
          formConfigRef.current[date][index][key].required &&
          !valuesRef.current[date][index][key]
        ) {
          isError = true;
        }
      }
      return { isError: isError };
    },
    [valuesRef.current, formConfigRef.current]
  );

  const setAddSpot = useCallback(
    (date) => {
      // 前のスポットが入力されてなかったらエラー
      const { isError } = errorCheckFromDateByKey(date, ITINERARY_KEY.spotName);
      if (isError) {
        Alert.alert(ERROR_TYPE.inputError, ERROR_MESSAGE.prevSpotError);
        return isError;
      }

      setValues((prev) => {
        return {
          ...prev,
          [date]: [
            ...prev[date],
            {
              [ITINERARY_KEY.spotId]: -1,
              [ITINERARY_KEY.spotName]: "",
              [ITINERARY_KEY.spotAddress]: "",
              [ITINERARY_KEY.arrivalTime]: "",
              [ITINERARY_KEY.stayTimeMin]: "",
              [ITINERARY_KEY.lat]: "",
              [ITINERARY_KEY.lng]: "",
              [ITINERARY_KEY.drivingDuration]: "",
              [ITINERARY_KEY.walkingDuration]: "",
            },
          ],
        };
      });
      return isError;
    },
    [values, formConfig]
  );

  const handleErrorCheck = useCallback(() => {
    let isError = false;
    for (const date in values) {
      if (values.hasOwnProperty(date)) {
        for (let index = 0; index < values[date].length; index++) {
          for (const key in values[date][index]) {
            if (values[date][index].hasOwnProperty(key)) {
              if (
                formConfig[date][index][key].required &&
                !values[date][index][key]
              ) {
                isError = true;
              }
            }
          }
        }
      }
    }
    return isError;
  }, [values, formConfig]);

  const handleConfirmClick = useCallback(() => {}, []);

  const handleLocationSelectPress = useCallback((data, details) => {
    // setSpotModal(false);
    const spotId = data.place_id;
    const spotName = data.structured_formatting.main_text;
    const spotAddress = data.description.split("、")[1];
    console.log(data);

    setSelectSpotsMenu((prev) => [
      ...prev,
      {
        spotId: spotId,
        description: LOCATION_TYPE.additional,
        spotName: spotName,
        spotAddress: spotAddress,
      },
    ]);
    // setSpotModal(true);
  }, []);

  const handleSpotSave = useCallback(
    (e, spot) => {
      console.log(spot);
      setValue(
        targetSpotDate,
        targetSpotIndex,
        ITINERARY_KEY.spotName,
        spot.spotName
      );
      setValue(
        targetSpotDate,
        targetSpotIndex,
        ITINERARY_KEY.spotAddress,
        spot.spotAddress
      );
      setValue(
        targetSpotDate,
        targetSpotIndex,
        ITINERARY_KEY.spotId,
        spot.spotId
      );
      setValue(targetSpotDate, targetSpotIndex, ITINERARY_KEY.lat, spot.lat);
      setValue(targetSpotDate, targetSpotIndex, ITINERARY_KEY.lng, spot.lng);
      spot.drivingDuration &&
        setValue(
          targetSpotDate,
          targetSpotIndex,
          ITINERARY_KEY.drivingDuration,
          spot.drivingDuration
        );
      spot.walkingDuration &&
        setValue(
          targetSpotDate,
          targetSpotIndex,
          ITINERARY_KEY.walkingDuration,
          spot.walkingDuration
        );
      setSpotModal(false);
    },
    [targetSpotDate, targetSpotIndex]
  );

  const showSpotModal = useCallback(
    async (date, index) => {
      setTargetSpotDate(date);
      setTargetSpotIndex(index);
      const value = values[date];
      console.log(value);
      try {
        if (index !== 0) {
          setIsMatatabiLoading(true);
          // 最初以外は前のスポット情報を取得する
          currentSpotName.current = value[index - 1][ITINERARY_KEY.spotName];
          const currentSpot = {
            spotId: value[index - 1][ITINERARY_KEY.spotId],
            spotName: value[index - 1][ITINERARY_KEY.spotName],
            spotAddress: value[index - 1][ITINERARY_KEY.spotAddress],
            lat: value[index - 1][ITINERARY_KEY.lat],
            lng: value[index - 1][ITINERARY_KEY.lng],
          };
          const nextSpots = locations
            .filter((location) => location.spotName !== currentSpotName.current)
            .map((location) => {
              return {
                spotId: location.spotId,
                spotName: location.spotName,
                spotAddress: location.spotAddress,
                lat: location.lat,
                lng: location.lng,
              };
            });
          const fetchDurationResult = await fetchRouteDurations({
            currentSpot,
            nextSpots,
          });
          const fetchRecomendedResult = await fetchRecomendedSpots({
            currentSpot,
          });
          const durationResultSpots = fetchDurationResult.spots.map((spot) => {
            return {
              spotId: spot.spotId,
              description: LOCATION_TYPE.prevSubmit,
              spotName: spot.spotName,
              spotAddress: spot.spotAddress,
              drivingDuration: spot.drivingDuration,
              walkingDuration: spot.walkingDuration,
              lat: spot.lat,
              lng: spot.lng,
            };
          });
          const recomendedSpots = fetchRecomendedResult.spots.map((spot) => {
            return {
              spotId: spot.spotId,
              description: LOCATION_TYPE.recomended,
              spotName: spot.spotName,
              spotAddress: spot.spotAddress,
              drivingDuration: spot.drivingDuration,
              walkingDuration: spot.walkingDuration,
              lat: spot.lat,
              lng: spot.lng,
            };
          });
          setSelectSpotsMenu([...durationResultSpots, ...recomendedSpots]);
          setIsMatatabiLoading(false);
        } else {
          currentSpotName.current = "";
          setSelectSpotsMenu(
            locations.map((location) => {
              return {
                spotId: location.spotId,
                description: LOCATION_TYPE.prevSubmit,
                spotName: location.spotName,
                spotAddress: location.spotAddress,
                lat: location.lat,
                lng: location.lng,
              };
            })
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setSpotModal(true);
      }
    },
    [values, locations]
  );

  const hideSpotModal = useCallback(() => {
    setSpotModal(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    const isError = handleErrorCheck();
    if (isError)
      return Alert.alert(ERROR_TYPE.inputError, ERROR_MESSAGE.inputError);
    let isSuccess;
    try {
      setIsMatatabiLoading(true);
      await createTravelProject(travelName, userId, values);
      isSuccess = true;
    } catch (err) {
      isSuccess = false;
      console.log(err);
    } finally {
      setToastDetails({
        id: generateUuid(),
        status: isSuccess ? TOAST.status.success : TOAST.status.error,
        title: isSuccess
          ? TOAST.title.travelAddSuccess
          : TOAST.title.travelAddError,
        description: isSuccess
          ? TOAST.description.travelAddSuccess
          : TOAST.description.travelAddError,
        variant: TOAST.variant.subtle,
        isClosable: true,
      });
      handleResetPage();
      setIsMatatabiLoading(false);
    }
  }, [values, travelName, userId]);

  return {
    states: {
      values,
      formConfig,
      isSpotModal,
      selectSpotsMenu,
      zIndex,
    },
    refs: {
      searchRef,
      currentSpotName,
    },
    func: {
      setValue,
      setAddSpot,
      showSpotModal,
      handleErrorCheck,
      handleConfirmClick,
      hideSpotModal,
      handleLocationSelectPress,
      handleSpotSave,
      setZIndex,
      handleSubmit,
    },
  };
};
