/**
 * @param {date} Date型
 * @return hh:mm:00.000
 */
export const convertAWSTimeFromDate = (date) =>
  `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:00.000Z`;

/**
 * @params {time} hh:mm:00.000Z
 * @return hh:mm
 */
export const convertTimeFromAWSTime = (time) => `${time.slice(0, 5)}`;
