export const recomendedSpotsTop5 = (currentSpotName, recomendedSpots) => {
  recomendedSpots.results.sort((a, b) => b.rating - a.rating);
  console.log("currentSpotName: ", currentSpotName);
  const filterdSpots = recomendedSpots.results.filter(
    (spot) => spot.name !== currentSpotName
  );
  return filterdSpots.slice(0, 5);
};
