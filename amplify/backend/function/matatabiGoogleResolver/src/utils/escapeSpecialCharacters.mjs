export const escapeSpecialCharacters = (string) => {
  let replaceString = string;
  replaceString = replaceString.replace(/[ ]/g, "%20");
  replaceString = replaceString.replace(/[　]/g, "%20");
  replaceString = replaceString.replace(/[#?!！？”’「」:@&+＠,;=/:'\"]/g, "");
  return replaceString;
};
