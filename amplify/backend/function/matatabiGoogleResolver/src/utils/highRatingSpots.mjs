export const highRatingSpots = (sightseeingSpot, restrantSpot) => {
  const highRatingAndNearSpots = [sightseeingSpot, restrantSpot];
  const processHighRatingSpots = highRatingAndNearSpots.map((spot) => ({
    spotName: spot.name,
    spotAddress: spot.formatted_address,
    spotId: spot.place_id,
    lat: spot.geometry.location.lat,
    lng: spot.geometry.location.lng,
  }));
  return processHighRatingSpots;
};
