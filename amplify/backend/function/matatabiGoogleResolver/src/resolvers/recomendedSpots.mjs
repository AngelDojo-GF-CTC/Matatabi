import { getDistance, getRecommendedSpots } from "../service/googleApi.mjs";
import { mergedSpot } from "../utils/mergeSpot.mjs";
import { escapeSpecialCharacters } from "../utils/escapeSpecialCharacters.mjs";

export const recomendedSpots = async (event) => {
  const currentSpotAddress = escapeSpecialCharacters(
    event.arguments.currentSpot.spotAddress
  );
  const currentSpotName = escapeSpecialCharacters(
    event.arguments.currentSpot.spotAddress
  );

  const recomendedSightseeingSpots = await getRecommendedSpots(
    "観光地",
    currentSpotAddress
  );
  const recomendedRestaurantSpots = await getRecommendedSpots(
    "飲食店",
    currentSpotAddress
  );

  // レーティング順にソートする
  const recomendedSpotsTop2 = (recomendedSpots) => {
    recomendedSpots.results.sort((a, b) => b.rating - a.rating);
    const filterdSpots = recomendedSpots.results.filter(
      (spot) => spot.name !== currentSpotName
    );
    return filterdSpots.slice(0, 2);
  };

  const recomendedSightseeingSpotTop2 = recomendedSpotsTop2(
    recomendedSightseeingSpots
  );
  const recomendedRestaurantSpotTop2 = recomendedSpotsTop2(
    recomendedRestaurantSpots
  );

  const highRatingSpots = () => {
    const highRatingSpots = [
      ...recomendedSightseeingSpotTop2,
      ...recomendedRestaurantSpotTop2,
    ];
    const processHighRatingSpots = highRatingSpots.map((spot) => ({
      spotName: spot.name,
      spotAddress: spot.formatted_address,
    }));
    return processHighRatingSpots;
  };

  const recomendedSpots = highRatingSpots();
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

  console.log(spots);
  return {
    spots: spots,
  };
};
