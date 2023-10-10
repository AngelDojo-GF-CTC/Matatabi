import React from "react";
import { IconButton } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { color } from "../../../styles/color";

export const ShareButton = (props) => (
  <IconButton
    icon={<FontAwesomeIcon icon={faArrowUpFromBracket} color={color.text} />}
    {...props}
  />
);
