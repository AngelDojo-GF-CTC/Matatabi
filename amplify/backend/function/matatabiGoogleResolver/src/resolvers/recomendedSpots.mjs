import axios from "axios";
import { getDistance } from "../service/googleApi.mjs";
import { mergedSpot } from "../utils/mergeSpot.mjs";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
const ssmClient = new SSMClient();
const getParameterCommand = new GetParameterCommand({
  Name: process.env["GOOGLE_API_KEY"],
  WithDecryption: true,
});

const getParameterCommandResponse = await ssmClient.send(getParameterCommand);
const apiKey = getParameterCommandResponse.Parameter.Value;

export const recomendedSpots = async (event) => {
  const escapeSpecialCharacters = (string) => {
    let replaceString = string;
    replaceString = replaceString.replace(/[ ]/g, "%20");
    replaceString = replaceString.replace(/[　]/g, "%20");
    replaceString = replaceString.replace(/[#?!！？”’「」:@&+＠,;=/:'\"]/g, "");
    return replaceString;
  };
  console.log(escapeSpecialCharacters("東京？ スカイツリー！"));

  const currentSpotAddress = escapeSpecialCharacters(
    event.arguments.currentSpot.spotAddress
  );
  const currentSpotName = escapeSpecialCharacters(
    event.arguments.currentSpot.spotAddress
  );

  const getRecommendedSpots = (placeType) => {
    return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${currentSpotAddress}%20${placeType}&language=ja&radius=100&key=${apiKey}`;
      console.log(url);
      axios
        .get(url)
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
  const recomendedSightseeingSpots = await getRecommendedSpots("観光地");
  const recomendedRestaurantSpots = await getRecommendedSpots("飲食店");

  // レーティング順にソートする
  const recomendedSpotsTop3 = (recomendedSpots) => {
    recomendedSpots.results.sort((a, b) => b.rating - a.rating);
    const filterdSpots = recomendedSpots.results.filter(
      (spot) => spot.name !== currentSpotName
    );
    return filterdSpots.slice(0, 3);
  };

  const recomendedSightseeingSpotTop3 = await recomendedSpotsTop3(
    recomendedSightseeingSpots
  );
  const recomendedRestaurantSpotTop3 = await recomendedSpotsTop3(
    recomendedRestaurantSpots
  );

  const highRatingSpots = () => {
    const highRatingSpots = [
      ...recomendedSightseeingSpotTop3,
      ...recomendedRestaurantSpotTop3,
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
