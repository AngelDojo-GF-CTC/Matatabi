import { atom } from "recoil";

export const myUserIdState = atom({
  key: "myUserIdState",
  default: "",
});

export const toastDetailsState = atom({
  key: "toastDetailsState",
  default: {
    id: "",
    title: "",
    description: "",
    status: "",
    variant: "",
    isClosable: true,
  },
});

export const isMatatabiLoadingState = atom({
  key: "isMatatabiLoadingState",
  default: false,
});
