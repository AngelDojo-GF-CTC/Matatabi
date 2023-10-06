export const highRatingSpots = (sightseeingSpot, restrantSpot) => {
  const highRatingAndNearSpots = [sightseeingSpot, restrantSpot];
  console.log(highRatingAndNearSpots);
  const processHighRatingSpots = highRatingAndNearSpots.map((spot) => {
    if (!!spot?.name) {
      return {
        spotName: spot.name,
        spotAddress: spot.formatted_address,
        spotId: spot.place_id,
        lat: spot.geometry.location.lat,
        lng: spot.geometry.location.lng,
      };
    }
  });
  return processHighRatingSpots;
};
