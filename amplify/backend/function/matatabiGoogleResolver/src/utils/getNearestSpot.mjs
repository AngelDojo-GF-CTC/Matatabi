export const getNearestSpot = (currentSpot, recomendedSpots) => {
  // 基準の緯度経度を取得
  const currentSpotLat = currentSpot.lat;
  const currentSpotLng = currentSpot.lng;

  const distances = recomendedSpots.map((spot) => {
    const distance = Math.sqrt(
      Math.pow(currentSpotLat - spot.geometry.location.lat, 2) +
        Math.pow(currentSpotLng - spot.geometry.location.lng, 2)
    );
    console.log("distance: ", distance);
    return distance;
  });
  console.log("distances: ", distances);

  return recomendedSpots[distances.indexOf(Math.min(...distances))];
};
