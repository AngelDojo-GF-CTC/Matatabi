import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
const ssmClient = new SSMClient();
import distanceMatrixService from "google-distance-matrix";

export const handler = async (event, context) => {
  const getParameterCommand = new GetParameterCommand({
    Name: process.env("googleApiKey"),
  });
  distanceMatrixService.key("AIzaSyAGwm9_X6uxVsnsCw9yw99QcZyslQOy50I");
  distanceMatrixService.language("ja");
  const origins = [event.currentSpots.spotAddress];
  const destinations = event.nextSpots.map((spot) => spot.spotAddress);

  const getDistance = (transportation) => {
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
          for (const spot of event.nextSpots) {
            trips.push({
              spotName: spot.spotName,
              spotAddress: spot.spotAddress,
              duration:
                distances.rows[0].elements[event.nextSpots.indexOf(spot)]
                  .duration.text,
              distance:
                distances.rows[0].elements[event.nextSpots.indexOf(spot)]
                  .distance.text,
            });
          }
          resolve(trips);
        }
      );
    });
  };

  const walkingMode = await getDistance("walking");
  console.log(walkingMode);

  // console.log(walkingMode);

  const drivingMode = await getDistance("driving");
  const test = { car: drivingMode, walk: walkingMode };
  console.log(test);
  return {
    car: drivingMode,
    walk: walkingMode,
  };
};

const e = {
  currentSpots: {
    spotName: "Apple 銀座",
    spotAddress: "東京都中央区銀座８丁目９−７ HULIC &New GINZA 8",
  },
  nextSpots: [
    {
      spotName: "アメリカンビレッジ",
      spotAddress: "沖縄県北谷町美浜 アメリカンビレッジ",
    },
    {
      spotName: "トウキョウスカイツリー",
      spotAddress: "東京都墨田区押上１丁目１−２, トウキョウスカイツリー",
    },
  ],
};
handler(e, "aa");
