import distanceMatrixService from "google-distance-matrix";
import { getGoogleApiKey } from "../ssm/getSsmParameter.mjs";
import axios from "axios";

const apiKey = await getGoogleApiKey();
distanceMatrixService.key(apiKey);
distanceMatrixService.language("ja");

const googleClient = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api",
  timeout: 5000,
});
export const getDistance = (
  transportation,
  origins,
  destinations,
  nextSpots
) => {
  distanceMatrixService.mode(transportation);
  return new Promise((resolve, reject) => {
    distanceMatrixService.matrix(
      origins,
      destinations,
      function (err, distances) {
        if (err) {
          console.log(err);
          reject(err);
        }
        let trips = [];
        for (const spot of nextSpots) {
          trips.push({
            spotName: spot.spotName,
            spotAddress: spot.spotAddress,
            [`${transportation}Dration`]:
              distances.rows[0].elements[nextSpots.indexOf(spot)].duration.text,
            distance:
              distances.rows[0].elements[nextSpots.indexOf(spot)].distance.text,
            spotId: spot.placeId,
            lat: spot.lat,
            lng: spot.lng,
          });
        }
        resolve(trips);
      }
    );
  });
};

export const getRecommendedSpots = (placeType, currentSpotAddress) => {
  return new Promise((resolve, reject) => {
    const path = `/place/textsearch/json?query=${currentSpotAddress}%20${placeType}&language=ja&radius=100&key=${apiKey}`;
    console.log(path);
    googleClient
      .get(path)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
