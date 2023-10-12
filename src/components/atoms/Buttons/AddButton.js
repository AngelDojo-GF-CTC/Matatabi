import React from "react";
import { IconButton, AddIcon } from "native-base";
// import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { color } from "../../../styles/color";

export const AddButton = (props) => (
  <IconButton icon={<AddIcon />} {...props} />
);
