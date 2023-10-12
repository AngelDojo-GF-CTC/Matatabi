import React, { useState } from "react";
import { Box, Button, Center, Input, Text, VStack } from "native-base";
import { SearchButton } from "../atoms/Buttons/SearchButton";
import { color } from "../../styles/color";
import {
  fetchTravelById,
  receiveTravelProject,
} from "../../service/appsync/travel";
import { groupsArrayByKey } from "../../utils/array";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isMatatabiLoadingState,
  myUserIdState,
  toastDetailsState,
} from "../../recoil/atoms";
import { generateUuid } from "../../service/crypto/uuid";
import { TOAST } from "../../constants/toast";

export const ReceiveTravelForm = () => {
  const userId = useRecoilValue(myUserIdState);
  const setIsMatatabiLoading = useSetRecoilState(isMatatabiLoadingState);
  const setToastDetail = useSetRecoilState(toastDetailsState);
  const [travelId, setTravelId] = useState();
  const [travel, setTravel] = useState();
  const handleSearchPress = async () => {
    try {
      const result = await fetchTravelById(travelId);
      if (!result.items.length) throw new Error("旅行が見つかりませんでした");
      const sortTravelData = groupsArrayByKey(
        result.items,
        "travelName",
        "travelDate"
      );
      setTravel(sortTravelData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTravelSave = async () => {
    let isSuccess;
    try {
      if (!userId) throw new Error("userId is empty");
      if (!travel) throw new Error("travel is empty");
      setIsMatatabiLoading(true);
      await receiveTravelProject(travel, userId);
      isSuccess = true;
    } catch (err) {
      isSuccess = false;
      console.log(err);
    } finally {
      setTravel(undefined);
      setIsMatatabiLoading(false);
      setToastDetail({
        id: generateUuid(),
        status: isSuccess ? TOAST.status.success : TOAST.status.error,
        title: isSuccess
          ? TOAST.title.receiveTravelSuccess
          : TOAST.title.receiveTravelError,
        description: isSuccess
          ? TOAST.description.receiveTravelSuccess
          : TOAST.description.receiveTravelError,
        variant: TOAST.variant.subtle,
        isClosable: true,
      });
    }
  };
  return (
    <Center>
      <VStack w={"80%"} mt={10} alignItems={"center"}>
        <Text color={color.text} bold>
          共有された旅のしおりを受け取ろう！
        </Text>
        <Box w={"100%"} mt={5}>
          <Input
            placeholder="旅行ID"
            size={"md"}
            w={"100%"}
            bgColor={"white"}
            value={travelId}
            onChangeText={(text) => setTravelId(text)}
            InputRightElement={<SearchButton onPress={handleSearchPress} />}
          />
        </Box>
        {travel && (
          <Box w={"80%"} mt={10}>
            <Button
              width={"100%"}
              backgroundColor={color.add}
              p={2}
              onPress={handleTravelSave}
            >
              <Text bold fontSize={20} color={color.gray}>
                {Object.keys(travel)[0]}
              </Text>
              <Text bold fontSize={13} color={color.gray}>
                {`${Object.values(travel)[0][0].travelDate} 〜 ${
                  Object.values(travel)[0][Object.values(travel).length - 1]
                    .travelDate
                }`}
              </Text>
            </Button>
          </Box>
        )}
      </VStack>
    </Center>
  );
};

// const travel = {
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
