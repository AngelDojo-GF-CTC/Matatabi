import React from "react";
import { Image, View } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import footPrint from "../../../assets/footPrint.png";
import { GOOGLE_API_KEY } from "@env";

export const GoogleMap = ({ currentCoordinate, endSpot, startSpot }) => {
  return (
    <>
      <View style={{ backgroundColor: "white", height: "25%" }}>
        {currentCoordinate.latitude && endSpot && (
          <MapView
            style={{ height: "100%", width: "100%" }}
            provider={PROVIDER_GOOGLE}
            initialRegion={currentCoordinate}
          >
            <Marker
              key="end"
              coordinate={endSpot}
              title="End"
              description="End Point"
            />
            <Marker
              key="current"
              coordinate={currentCoordinate}
              title="Current"
              description="Current Point"
            >
              <Image
                alt="footPrint"
                source={footPrint}
                style={{ width: 30, height: 30 }}
              />
            </Marker>
            <MapViewDirections
              origin={startSpot}
              destination={endSpot}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          </MapView>
        )}
      </View>
    </>
  );
};
