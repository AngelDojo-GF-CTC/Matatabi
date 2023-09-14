import React from "react";
import { Layout } from "../templates/Layout";
import { TravelList } from "../organisms/TravelList";
import { TravelAddForm } from "../organisms/TravelAddForm";
import { useHome } from "../../hooks/useHome";

export const Home = () => {
  const {
    states: { pageMode },
    handlers: { handleAddFormMode, handleResetPage },
  } = useHome();
  return (
    <Layout>
      {pageMode.addFormMode ? (
        <TravelAddForm handleResetPage={handleResetPage} />
      ) : pageMode.travelDetailMode ? (
        // TODO: 個別の旅のしおり閲覧ページ
        <></>
      ) : (
        <TravelList handleAddFormMode={handleAddFormMode} />
      )}
    </Layout>
  );
};
