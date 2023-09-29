import { getDistance, getRecommendedSpots } from "../service/googleApi.mjs";
import { mergedSpot } from "../utils/mergeSpot.mjs";
import { highRatingSpots } from "../utils/highRatingSpots.mjs";
import { getNearestSpot } from "../utils/getNearestSpot.mjs";
import { recomendedSpotsTop5 } from "../utils/recomendedSpotsTop5.mjs";
import { escapeSpecialCharacters } from "../utils/escapeSpecialCharacters.mjs";

export const recomendedSpots = async (event) => {
  const currentSpotAddress = escapeSpecialCharacters(
    event.arguments.currentSpot.spotAddress
  );
  const currentSpotName = escapeSpecialCharacters(
    event.arguments.currentSpot.spotName
  );
  const currentSpot = event.arguments.currentSpot;

  const recomendedSightseeingSpots = await getRecommendedSpots(
    "観光地",
    currentSpotAddress
  );
  console.log(
    "recomendedSightseeingSpots: ",
    JSON.stringify(recomendedSightseeingSpots)
  );
  const recomendedRestaurantSpots = await getRecommendedSpots(
    "飲食店",
    currentSpotAddress
  );

  // レーティング順にソートする
  // const recomendedSpotsTop5 = (recomendedSpots) => {
  //   recomendedSpots.results.sort((a, b) => b.rating - a.rating);
  //   console.log("currentSpotName: ", currentSpotName);
  //   const filterdSpots = recomendedSpots.results.filter(
  //     (spot) => spot.name !== currentSpotName
  //   );
  //   return filterdSpots.slice(0, 5);
  // };

  const recomendedSightseeingSpotTop5 = recomendedSpotsTop5(
    currentSpotName,
    recomendedSightseeingSpots
  );
  console.log("recomendedSightseeingSpotTop5: ", recomendedSightseeingSpotTop5);
  const recomendedRestaurantSpotTop5 = recomendedSpotsTop5(
    currentSpotName,
    recomendedRestaurantSpots
  );

  // const getNearestSpot = (currentSpot, recomendedSpots) => {
  //   // 基準の緯度経度を取得
  //   const currentSpotLat = currentSpot.lat;
  //   const currentSpotLng = currentSpot.lng;

  //   const distances = recomendedSpots.map((spot) => {
  //     const distance = Math.sqrt(
  //       Math.pow(currentSpotLat - spot.geometry.location.lat, 2) +
  //         Math.pow(currentSpotLng - spot.geometry.location.lng, 2)
  //     );
  //     console.log("distance: ", distance);
  //     return distance;
  //   });
  //   console.log("distances: ", distances);

  //   return recomendedSpots[distances.indexOf(Math.min(...distances))];
  // };

  const getNearestRecommendedSightseeingSpot = getNearestSpot(
    currentSpot,
    recomendedSightseeingSpotTop5
  );
  console.log(
    "getNearestRecommendedSightseeingSpot: ",
    getNearestRecommendedSightseeingSpot
  );

  const getNearestRecommendedRestaurantSpot = getNearestSpot(
    currentSpot,
    recomendedRestaurantSpotTop5
  );

  console.log(
    "getNearestRecommendedRestaurantSpot: ",
    getNearestRecommendedRestaurantSpot
  );

  // const highRatingSpots = (sightseeingSpot, restrantSpot) => {
  //   const highRatingAndNearSpots = [sightseeingSpot, restrantSpot];
  //   const processHighRatingSpots = highRatingAndNearSpots.map((spot) => ({
  //     spotName: spot.name,
  //     spotAddress: spot.formatted_address,
  //     spotId: spot.place_id,
  //     lat: spot.geometry.location.lat,
  //     lng: spot.geometry.location.lng,
  //   }));
  //   return processHighRatingSpots;
  // };

  const recomendedSpots = highRatingSpots(
    getNearestRecommendedSightseeingSpot,
    getNearestRecommendedRestaurantSpot
  );

  const destinations = recomendedSpots.map((spot) => spot.spotAddress);
  const walkingMode = await getDistance(
    "walking",
    [currentSpotAddress],
    destinations,
    recomendedSpots
  );
  const drivingMode = await getDistance(
    "driving",
    [currentSpotAddress],
    destinations,
    recomendedSpots
  );
  const spots = mergedSpot(walkingMode, drivingMode);

  console.log("spots: ", spots);
  return {
    spots: spots,
  };
};
