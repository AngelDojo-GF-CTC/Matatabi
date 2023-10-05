import React, { useEffect } from "react";
import { Header } from "../molecules/Header";
import { View } from "react-native";
import { useToast } from "native-base";
import { useRecoilValue } from "recoil";
import { isToastOpenState, toastDetailsState } from "../../recoil/atoms";
import { ToastAlert } from "../molecules/ToastAlert";

export const Layout = ({ handleResetPage, children }) => {
  const isToastOpen = useRecoilValue(isToastOpenState);
  const toastDetails = useRecoilValue(toastDetailsState);
  const toast = useToast();
  useEffect(() => {
    if (isToastOpen && toastDetails?.id) {
      toast.show({
        render: ({}) => <ToastAlert {...toastDetails} />,
      });
    }
  }, [isToastOpen, toastDetails?.id]);
  return (
    <View /*style={{ height: "100%", width: "100%" }}*/>
      <Header handleResetPage={handleResetPage} />
      {children}
    </View>
  );
};
