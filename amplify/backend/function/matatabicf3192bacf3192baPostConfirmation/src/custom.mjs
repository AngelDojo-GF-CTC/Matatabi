import { createUserItem } from "./appsync/excuteApi.mjs";
export const customHandler = async (event, context) => {
  const userAttributes = event.request.userAttributes;
  const input = {
    userId: userAttributes.sub,
    name: userAttributes.name,
    email: userAttributes.email,
    gender: userAttributes.gender,
    age: "24",
  };
  const createUser = await createUserItem(input);
  console.log(createUser);

  return event;
};
