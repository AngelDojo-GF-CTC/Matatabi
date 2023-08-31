import { customHandler } from "./custom.mjs";

export const handler = async (event, context) => {
  await customHandler(event, context);
  return event;
};
