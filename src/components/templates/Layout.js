import React, { useEffect } from "react";
import { Header } from "../molecules/Header";
import { View } from "react-native";
import { useToast } from "native-base";
import { useRecoilValue } from "recoil";
import { isMatatabiLoadingState, toastDetailsState } from "../../recoil/atoms";
import { ToastAlert } from "../molecules/ToastAlert";
import { MatatabiLoading } from "../molecules/MatatabiLoading";

export const Layout = ({ handleResetPage, children }) => {
  const toastDetails = useRecoilValue(toastDetailsState);
  const isMatatabiLoading = useRecoilValue(isMatatabiLoadingState);
  const toast = useToast();

  useEffect(() => {
    if (toastDetails?.id) {
      toast.show({
        render: ({}) => <ToastAlert {...toastDetails} />,
      });
    }
  }, [toastDetails?.id]);

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
