import { getDistance } from "../service/googleApi.mjs";
import { mergedSpot } from "../utils/mergeSpot.mjs";
export const getRouteDurations = async (event) => {
  const origins = [event.arguments.currentSpot.spotAddress];
  const destinations = event.arguments.nextSpots.map(
    (spot) => spot.spotAddress
  );

  const walkingMode = await getDistance(
    "walking",
    origins,
    destinations,
    event.arguments.nextSpots
  );

  const drivingMode = await getDistance(
    "driving",
    origins,
    destinations,
    event.arguments.nextSpots
  );

  const spots = mergedSpot(walkingMode, drivingMode);
  console.log("spots: ", spots);

  return {
    spots: spots,
  };
};
