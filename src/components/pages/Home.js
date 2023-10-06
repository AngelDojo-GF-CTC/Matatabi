import React from "react";
import { Layout } from "../templates/Layout";
import { TravelList } from "../organisms/TravelList";
import { TravelAddForm } from "../organisms/TravelAddForm";
import { useHome } from "../../hooks/useHome";
import { Itinerary } from "../organisms/Itinerary";
import { useTravelList } from "../../hooks/useTravelList";
import { useItinerary } from "../../hooks/useItinerary";

export const Home = () => {
  const {
    states: { pageMode },
    handlers: { handleAddFormMode, handleTravelDetailMode, handleResetPage },
  } = useHome();
  const {
    state: { travelList, targetTravelName: travelName, targetTravelData },
    handlers: { handleTravelPress },
  } = useTravelList(handleTravelDetailMode, pageMode);
  const {
    states: { values, formConfig, isSpotModal, selectSpotsMenu, zIndex },
    refs: { searchRef, currentSpotName },
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
  } = useItinerary(
    undefined,
    undefined,
    travelName,
    undefined,
    targetTravelData
  );
  return (
    <Layout handleResetPage={handleResetPage}>
      {pageMode.addFormMode ? (
        <TravelAddForm handleResetPage={handleResetPage} />
      ) : pageMode.travelDetailMode ? (
        // TODO: 個別の旅のしおり閲覧ページ
        <Itinerary
          {...{
            travelName,
            values,
            formConfig,
            isSpotModal,
            selectSpotsMenu,
            zIndex,
            // searchRef,
            currentSpotName,
            setValue,
            setAddSpot,
            showSpotModal,
            // handleErrorCheck,
            // handleConfirmClick,
            hideSpotModal,
            // handleLocationSelectPress,
            handleSpotSave,
            // setZIndex,
            handleSubmit,
            // locations,
          }}
        />
      ) : (
        <TravelList
          {...{
            travelList,
            handleTravelPress,
            handleAddFormMode,
          }}
        />
      )}
    </Layout>
  );
};
