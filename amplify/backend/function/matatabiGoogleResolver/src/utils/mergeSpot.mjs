export const mergedSpot = (walkingMode, drivingMode) => {
  const mergedSpots = walkingMode.map((spot, index) => {
    const carSpot = drivingMode.find(
      (carSpot) => carSpot.spotAddress === spot.spotAddress
    );
    if (carSpot) {
      return {
        ...spot,
        drivingDuration: carSpot.drivingDuration,
      };
    } else {
      return spot;
    }
  });
  return mergedSpots;
};
