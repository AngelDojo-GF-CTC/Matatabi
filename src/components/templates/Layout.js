import React, { useEffect } from "react";
import { Header } from "../molecules/Header";
import { View } from "react-native";
import { useToast } from "native-base";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isMatatabiLoadingState,
  isToastOpenState,
  toastDetailsState,
} from "../../recoil/atoms";
import { ToastAlert } from "../molecules/ToastAlert";
import { MatatabiLoading } from "../molecules/MatatabiLoading";

export const Layout = ({ handleResetPage, children }) => {
  const isToastOpen = useRecoilValue(isToastOpenState);
  const toastDetails = useRecoilValue(toastDetailsState);
  const isMatatabiLoading = useRecoilValue(isMatatabiLoadingState);
  const setToastDetails = useSetRecoilState(toastDetailsState);
  const toast = useToast();
  useEffect(() => {
    if (isToastOpen && toastDetails?.id) {
      toast.show({
        render: ({}) => <ToastAlert {...toastDetails} />,
      });
    } else {
      toast.closeAll();
      setToastDetails({
        id: undefined,
        title: undefined,
        status: undefined,
        variant: undefined,
        description: undefined,
        isClosable: undefined,
      });
    }
  }, [isToastOpen, toastDetails?.id]);

  return (
    <View /*style={{ height: "100%", width: "100%" }}*/>
      <Header handleResetPage={handleResetPage} />
      {isMatatabiLoading && <MatatabiLoading />}
      <View
        style={{
          height: isMatatabiLoading ? "0%" : "100%",
          width: isMatatabiLoading ? "0%" : "100%",
          //
        }}
      >
        {children}
      </View>
    </View>
  );
};
